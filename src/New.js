import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {Stack, Depths, PrimaryButton, Dropdown, Text} from "@fluentui/react";
import {initializeIcons} from '@fluentui/font-icons-mdl2';

initializeIcons();

const dropdownStyles = {dropdown: {width: 300}};

const Dashboard = () => {
    const [value, setValue] = useState();
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const users = JSON.parse(localStorage.getItem('token'));

    const handelSelect = (selectedOption) => {
        setValue(selectedOption.key)
    }

    const handelSubmit = () => {
        setData([...data, value]);
        // debugger;
        if (data.length === 0) {
            newData.push([value])
        } else if (data[data.length - 1] === value) {
            const addArry = newData;
            addArry[addArry.length - 1].push(value)
        } else {
            newData.push([value])
        }
    }
    console.log(data)
    console.log(newData)
    console.log(newData.join('\n') + '\n\n')

    return (
        <>
            {
                users ? (
                    <Stack wrap horizontal horizontalAlign={'center'}
                           style={{height: '100vh', background: "ghostwhite"}}>
                        <Stack verticalAlign={'center'} horizontalAlign={'center'} style={{width: '50%'}}>
                            <Stack vertical tokens={{childrenGap: 5}}
                                   style={{boxShadow: Depths.depth16, padding: '20px', background: "white"}}>
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
                                <PrimaryButton disabled={!value} onClick={handelSubmit}>Add </PrimaryButton>

                                <div className={'row'}>
                                    {
                                        newData.map((ele, i) => {
                                            return (
                                                <div key={i} className={'col-1'}>
                                                    {
                                                        ele.map((e,index) => {
                                                           return(
                                                               <div key={index}>{ e }</div>
                                                           )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
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