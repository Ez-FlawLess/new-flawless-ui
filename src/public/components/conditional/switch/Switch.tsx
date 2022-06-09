import React, { Children, FC, ReactElement, useState } from "react";
import { Case } from "./case";
import { CasePropsI } from "./case/Case.types";
import { SwitchPropsI } from "./Switch.types";

export const Switch = <T,>(props : {
    expression: T,
    children: ReactElement<CasePropsI<T>>[],
}): ReactElement | null => {
    

    console.log(props.children[0].props.value)

    return (
        <>
        </>
    )
}



const Test: FC = () => {

    const [test, setTest] = useState<string>('hi')

    return (
        <Switch expression={test}>
            <Case value='hi'>

            </Case>
            <Case value={3}>

            </Case>
        </Switch>
    )
}