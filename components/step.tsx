'use client';
import React from 'react';
import {UserStep} from "@/lib/model/model";

export function Step({userSteps, onMouseEnterRecord, onMouseLeaveRecord}: {
    userSteps: UserStep[] | undefined,
    onMouseEnterRecord?: (record: UserStep, index: number) => void,
    onMouseLeaveRecord?: (record: UserStep, index: number) => void,
}) {
    return (
        <div className="flex flex-col items-center  p-5 rounded-xl ">
            <h1 className="text-lg font-semibold mb-4">操作记录</h1>
            <div className="overflow-auto h-64">
                {userSteps && userSteps.map((record, index) => (
                    <div key={index} className="flex mb-2 p-2 bg-base-300 rounded"
                         onMouseEnter={() => onMouseEnterRecord && onMouseEnterRecord(record, index)}
                         onMouseLeave={() => onMouseLeaveRecord && onMouseLeaveRecord(record, index)}>
                        <div className="flex-1 cursor-pointer"
                             style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div className="font-semibold">操作 {index + 1}:</div>
                            <div>坐标: [ {Math.floor(record.cell / 9)}, {record.cell % 9} ]</div>
                            <div>值: {record.value ? record.value : "无"}</div>
                            <div>时间: {record.create_time.toLocaleTimeString()}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
