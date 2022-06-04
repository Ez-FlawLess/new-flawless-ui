import React from "react";
import { FC, Key, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import useRefEvent from "../../../private/hooks/useRefEvent";
import useTimeout from "../../../private/hooks/useTimeout";
import { CarouselPropsI } from "./Carousel.types";

const ContainerDiv = styled.div`
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    scroll-snap-type: x mandatory;
    ::-webkit-scrollbar {
        display: none;
    }
`

const ItemDiv = styled.div`
    flex: none;
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    justify-content: center;
    items-align: center;
`


export const Carousel: FC<CarouselPropsI> = props => {

    const containerDivRef = useRef<HTMLDivElement>(null)
    const selectedDivRef = useRef<HTMLDivElement>(null)
    const nextDivRef = useRef<HTMLDivElement>(null)

    const [items, setItems] = useState<ReactElement[]>([])
    const [selectedKey, setSelectedKey] = useState<Key | null>(null)

    const itemsLength: number = useMemo(() => items.length, [items])

    const index: number = useMemo(() => {
        if (Array.isArray(props.children) && selectedKey ) {
            return props.children?.findIndex(child => child.key === selectedKey)
        }
        return -1
    }, [props.children, selectedKey])

    const prevIndex: number = useMemo(() => {
        if (index === 0) return itemsLength - 1
        return index - 1
    }, [itemsLength, index]) 

    const nextIndex: number = useMemo(() => {
        if (index === itemsLength - 1) return 0
        return index + 1
    }, [itemsLength, index])

    useEffect(() => {
        if (Array.isArray(props.children) && props.children[0]) {
            setItems(props.children)
        }
    }, [props.children])

    useEffect(() => {
        if (!selectedKey && items.length) setSelectedKey(items[0].key)
    }, [items, selectedKey])

    useEffect(() => {
        if (props.selectedKey) setSelectedKey(props.selectedKey)
    }, [props.selectedKey])

    useEffect(() => {
        if (selectedKey) {
            containerDivRef.current?.scrollTo({left: selectedDivRef.current?.offsetLeft})
        }
    }, [selectedKey, containerDivRef, selectedDivRef])

    useEffect(() => {
        if (props.onSlide && selectedKey) props.onSlide(selectedKey, index)
    }, [props.onSlide, index, selectedKey])

    const scrollToPrev = () => {
        containerDivRef.current?.scrollTo({left: 0, behavior: 'smooth'})
    }

    const scrollToNext = () => {
        containerDivRef.current?.scrollTo({left: containerDivRef.current.scrollWidth, behavior: 'smooth'})
    }

    useRefEvent(props.previousButtonRef, 'click', scrollToPrev)

    useRefEvent(props.nextButtonRef, 'click', scrollToNext)

    useTimeout(scrollToNext, props.intervalTimer, [props.intervalTimer, selectedKey, containerDivRef])

    const selectPrev = () => {
        const prevItem = items[prevIndex]
        if (prevItem) setSelectedKey(prevItem.key)
    }

    const selectNext = () => {
        const nextItem = items[nextIndex]
        if (nextItem) setSelectedKey(nextItem.key)
    }

    const handleContainerOnScrll = () => {
        if (containerDivRef.current?.scrollLeft === 0) return selectPrev()
        if (containerDivRef.current && nextDivRef.current && containerDivRef.current?.scrollLeft >= nextDivRef.current?.offsetLeft) return selectNext()
    }

    if (index !== -1) {
        return (
            <ContainerDiv
                ref={containerDivRef}
                onScroll={handleContainerOnScrll}
            >
                <ItemDiv>
                    {items[prevIndex]}
                </ItemDiv>
                <ItemDiv
                    ref={selectedDivRef}
                >
                    {items[index]}
                </ItemDiv>
                <ItemDiv
                    ref={nextDivRef}
                >
                    {items[nextIndex]}
                </ItemDiv>
            </ContainerDiv>
        )
    }
    return <>{props.children}</>
}