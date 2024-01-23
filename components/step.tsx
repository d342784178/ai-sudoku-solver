'use client';
import React from 'react';
import {Table} from 'antd';
import {ColumnsType} from "antd/es/table";
import UserStep from '@/lib/model/UserStep';


const columns: ColumnsType<UserStep> = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
        render: (value, record, index) => (<div>{index + 1}</div>),
    },
    {
        title: 'Coordinate',
        dataIndex: 'coordinate',
        key: 'coordinate',
        render: (value, record) => (<div>row: {Math.floor(record.cell / 9) + 1}, col: {(record.cell % 9) + 1}</div>),
    },
    {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
        render: (value, record) => (<div>{record.value}</div>),
    },
    // {
    //     title: 'Operate Time',
    //     dataIndex: 'operate_time',
    //     key: 'operate_time',
    //     render: (value, record) => (<div>{record.create_time.toLocaleTimeString()}</div>),
    // },

];


export function Step({userSteps, onMouseEnterRecord, onMouseLeaveRecord}: {
    userSteps: UserStep[] | undefined,
    onMouseEnterRecord?: (record: UserStep, index: number) => void,
    onMouseLeaveRecord?: (record: UserStep, index: number) => void,
}) {
    const dataSource=userSteps&&userSteps.map((record, index)=>{
        return {...record, key: index}
    })
    return (
        <div className="flex flex-col items-center rounded-xl ">
            <h1 className="text-lg font-semibold ">User&apos;s Operation </h1>
            <div className="overflow-auto w-full">
                <Table style={{width: '100%'}} columns={columns} dataSource={dataSource}
                       pagination={{
                           pageSize: 5,
                           defaultCurrent: userSteps ? Math.floor(userSteps.length / 5) : 0,
                           position: ['topLeft'],
                       }}/>
            </div>
        </div>
    );
}
