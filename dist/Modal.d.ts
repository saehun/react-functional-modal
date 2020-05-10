import * as React from "react";
interface Option {
    key?: string;
    fading?: boolean;
    style?: React.CSSProperties;
    onClose?: (...args: any[]) => void;
    clickOutsideToClose?: boolean;
}
export declare const show: (children: React.ReactNode, option?: Option) => void;
export declare const hide: (key?: string, ...args: any[]) => void;
export {};
