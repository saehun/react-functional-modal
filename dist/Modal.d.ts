import * as React from "react";
interface Option {
    key?: string;
    fading?: boolean;
    styles?: {
        justifyContent?: string;
        alignItems?: string;
        background?: string;
    };
    onClose?: () => void;
    clickOutsideToClose?: boolean;
}
export declare const show: (children: React.ReactNode, option?: Option) => void;
export declare const hide: (key?: string) => void;
export {};
