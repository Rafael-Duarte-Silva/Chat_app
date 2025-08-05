import { ComponentProps, memo, ReactNode } from "react";

type ChatProfileProps = {
    element?: ReactNode;
    children?: ReactNode;
    classNameContainer?: string;
    classNameInfos?: string;
    classNameUsername?: string;
    username: string;
    onClick?(): void;
};

export const ChatProfile = memo(function ChatProfile({
    element = "div",
    children = <></>,
    username,
    classNameContainer = "",
    classNameInfos = "",
    classNameUsername = "",
    onClick,
}: ChatProfileProps) {
    const fullNameInitials = (username: string | undefined): string => {
        return username
            ? username
                  .split(" ")
                  .map((word) => word.charAt(0).toLowerCase())
                  .join("")
            : "";
    };

    return (
        <Wrapper
            element={element}
            className={`flex gap-x-4 text-stone-50 ${classNameContainer}`}
            onClick={onClick}
        >
            <div className="flex size-10 items-center justify-center rounded-[50%] bg-amber-400 text-lg uppercase">
                {fullNameInitials(username)}
            </div>
            <div className={`flex flex-auto flex-col ${classNameInfos}`}>
                <div className={`capitalize ${classNameUsername}`}>
                    {username}
                </div>
                {children}
            </div>
        </Wrapper>
    );
});

const Wrapper = <T extends React.ElementType>({
    element: T,
    ...props
}: {
    element: T;
} & ComponentProps<T>) => <T {...props} />;

