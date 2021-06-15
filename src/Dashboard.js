import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Stack, Depths, PrimaryButton, Dropdown, Text} from "@fluentui/react";
import {initializeIcons} from '@fluentui/font-icons-mdl2';

initializeIcons();

const dropdownStyles = {dropdown: {width: 300}};
let count = 0;
let final = [];
const Dashboard = () => {
    const [value, setValue] = useState({
        name: ''
    });
    const [data, setData] = useState([]);
    const users = JSON.parse(localStorage.getItem('token'));

    // let item = [];
    // data.forEach((ele, i) => {
    //     console.log(ele)
    //     // debugger;
    //     const lastEle = data[data.length - 1];
    //     if (ele === lastEle) {
    //         item.push(
    //             <div className={'row'}>
    //                 <div className={'col-1'}>
    //                     {ele}
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         item.push(
    //             <div>{ele}</div>
    //         )
    //     }
    // });

    const handelSelect = (selectedOption) => {
        setValue((oldData) => {
            return {
                ...value,
                name: selectedOption.key,
            }
        });
    }

    const handelSubmit = () => {
        let newData = data;
        if (data.length === 0 || data[data.length - 1]?.name === value.name) {
            let newValue = value;
            newValue['countNumber'] = count;
            setData((previous) => {
                return [...previous, value]
            });
        } else {
            count++;
            let newValue = value;
            newValue['countNumber'] = count;
            setData((previous) => {
                return [...previous, value]
            });
        }
    }
    // debugger
    const finalValue = data.map((ele, i) => ele.countNumber);
    // console.log('mapping array', finalValue);
    final = finalValue.filter((ele, i) => finalValue.indexOf(ele) === i);
    // console.log('final value', final);
    // console.log(data)


    return (
        <>
            {
                users ? (
                    <Stack wrap horizontal horizontalAlign={'center'} style={{height: '100vh',background: "ghostwhite"}}>
                        <Stack verticalAlign={'center'} horizontalAlign={'center'} style={{width: '50%'}}>
                            <Stack vertical tokens={{childrenGap: 5}}
                                   style={{boxShadow: Depths.depth16, padding: '20px',background: "white"}}>
                                <h1>Let's Play</h1>
                                <Stack.Item>
                                    <Dropdown
                                        placeholder="Select an option"
                                        options={[
                                            {key: 'Select', text: 'Select', disabled: 'true'},
                                            {key: 'H', text: 'Head'},
                                            {key: 'T', text: 'Tail'},
                                        ]}
                                        required
                                        onChange={(e, selectedOption) => {
                                            handelSelect(selectedOption)
                                        }}
                                        styles={dropdownStyles}
                                    />
                                </Stack.Item>
                                <PrimaryButton disabled={!value.name} onClick={handelSubmit}>Add </PrimaryButton>

                                {/*<Text> {content}*/}
                                {/* </Text>*/}
                                {/*<div className={'row'} style={{display: 'flex', flexDirection: 'row'}}>*/}
                                {/*    <div className={'col-1'}>*/}
                                {/*        {item}*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className={'row'}>
                                    {
                                        final && final.map((value, index) => {
                                            return (
                                                <div className={'col-1'} key={index}>
                                                    {
                                                        data && data.map((e, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {
                                                                        e.countNumber === value ? (
                                                                            <div>{e.name}</div>) : null
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })}
                                </div>

                            </Stack>
                        </Stack>
                    </Stack>
                ) : (<Redirect to='/login'/>)
            }
        </>
    )
}

export default Dashboard;