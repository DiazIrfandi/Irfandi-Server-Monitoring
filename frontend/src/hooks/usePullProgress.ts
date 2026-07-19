import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export function usePullProgress(){

    const [

        progress,

        setProgress,

    ] = useState<any>(null);

    useEffect(()=>{

        socket.connect();

        socket.on(

            "docker:image:pull",

            setProgress

        );

        return ()=>{

            socket.off(

                "docker:image:pull"

            );

        };

    },[]);

    return progress;

}