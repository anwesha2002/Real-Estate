import {ReactNode} from "react";

export enum stateValue {
    LOADING = "loading",
    ERROR = "error",
    SUCCESS = "success"
}

interface screenComponent {
    state? : stateValue,
    children? : ReactNode,
    error? : string | null | undefined
}


export function ScreenComponent({state , children, error} : screenComponent) {
    switch (state){
        case stateValue.SUCCESS : return <div>{children}</div>
        case stateValue.LOADING : return <div>Loading...</div>
        case stateValue.ERROR :
            return <div>
                <p>{error}</p>
            </div>
    }
}
