import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    return (await this.verify(client)) !== null;
  }

  async verify(socket: Socket) {
    const cookieHeader = socket.handshake.headers.cookie;
    const cookies = this.parseCookies(cookieHeader);
    if (!cookies) {
      return null;
    }

    const token = cookies['jwt'];
    if (!token) {
      return null;
    }

    try {
      const payload: { sub: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtSecret,
        },
      );

      return payload.sub;
    } catch {
      return null;
    }
  }

  parseCookies(
    cookieHeader: string | undefined,
  ): Record<string, string> | undefined {
    if (!cookieHeader) {
      return;
    }

    return (
      cookieHeader?.split(';')?.reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = decodeURIComponent(value);
          return acc;
        },
        {} as Record<string, string>,
      ) || undefined
    );
  }
}
