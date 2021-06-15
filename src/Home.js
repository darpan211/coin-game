import React from "react";
import {Stack, PrimaryButton} from "@fluentui/react";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();

    return(
        <>
           <Stack wrap horizontal horizontalAlign={'center'} style={{height:'100vh', background:'ghostwhite'}}>
                <Stack verticalAlign={'center'}>
                    <PrimaryButton onClick={() => history.push('/login') }>Click Here to Play the Game</PrimaryButton>
                </Stack>
           </Stack>
        </>
    )
}

export default Home;