import { Key, ReactElement, RefObject } from "react";

export interface CarouselPropsI {
    children?: ReactElement[] | ReactElement,
    nextButtonRef?: RefObject<HTMLElement>,
    previousButtonRef?: RefObject<HTMLElement>,
    selectedKey?: Key,
    intervalTimer?: number,
    onSlide?: (newKey: Key, newIndex: number) => any,
}