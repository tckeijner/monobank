import React, {useEffect, useState} from "react";

export interface MoneyLabelProps {
    newValue: number
}

export default function MoneyLabel(props: MoneyLabelProps) {
    let [currentValue, updateCurrentValue] = useState(0);
    const [labelValue, setLabelValue] = useState(0)

    /*
    * useEffect hook that triggers whenever a new value is passed.
    * This creates a visual effect for the money label to increase as a counter
    */
    useEffect(() => {
        const newValue = props.newValue;
        if (currentValue !== newValue) {
            const difference = newValue - currentValue;
            const increment = difference / 400;
            let localLabelValue = currentValue;
            updateCurrentValue((_) => newValue);
            const interval = setInterval(() => {
                localLabelValue += increment
                if ((increment > 0 && localLabelValue < newValue) ||
                    (increment < 0 && localLabelValue > newValue)) {
                    setLabelValue(() => Math.floor(localLabelValue + increment))
                } else {
                    setLabelValue(() => newValue);
                    clearInterval(interval)
                }
            }, 1)
        }
    }, [props.newValue])

    return (
        <div className='moneyLabel' >$ {labelValue}</div>
    )
}