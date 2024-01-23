'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Table, Tooltip} from 'antd';
import {ColumnsType} from "antd/es/table";
import _ from "lodash";
import {IoRefreshCircle} from "react-icons/io5";
import {GameHelper, Puzzle} from "@/lib/model/Puzzle";

const columns: ColumnsType<Puzzle> = [
    {
        title: 'Create Time',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (value, record) => (<div>{record.create_time.toLocaleTimeString()}</div>),
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (value, record) => (<div>{record.difficulty <= 5 ? record.difficulty : 'custom'}</div>),
    },
    {
        title: 'Game State',
        dataIndex: 'state',
        key: 'state',
        render: (value, record) => (<div>{record.state > 0 ? 'Passed' : record.state < 0 ? 'Failed' : 'Ongoing'}</div>),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (value: any, record) => (
            <Link href={`/game/${record.id}`}>Detail</Link>
        )
    },

];

export function History({}: {}) {
    const [loading, setLoading] = useState(false);
    const [historys, setHistorys] = useState<Puzzle[]>()
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        setLoading(true)
        fetch("/api/puzzle/history", {
            method: "GET",
        }).then(async resp => {
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                    setHistorys(_.map(res.data, (data) => GameHelper.parseGame(data)));
                }
            }
            setLoading(false)
        });
    }, [refreshIndex])

    return (
        <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 max-w-full">
            <div className="flex justify-items-center">
                <h3 className="text-lg font-semibold mb-4">Game History</h3>
                <Tooltip title="Refresh">
                    <span onClick={() => setRefreshIndex(refreshIndex + 1)}><IoRefreshCircle/></span>
                </Tooltip>
            </div>
            <Table columns={columns} dataSource={historys} loading={loading}/>
        </div>);
}