'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Game} from "@/app/lib/model/model";
import {Table, Tooltip} from 'antd';
import {ColumnsType} from "antd/es/table";
import _ from "lodash";
import {IoRefreshCircle} from "react-icons/io5";

const columns: ColumnsType<Game> = [
    {
        title: '时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (value, record) => (<div>{record.create_time.toLocaleTimeString()}</div>),
    },
    {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (value, record) => (<div>{record.difficulty <= 5 ? record.difficulty : '自定义'}</div>),
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (value, record) => (<div>{record.state > 0 ? '成功' : record.state < 0 ? '失败' : '进行中'}</div>),
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (value: any, record) => (
            <Link href={`/game/${record.id}`}>点击查看</Link>
        )
    },

];

export function History({}: {}) {
    const [loading, setLoading] = useState(false);
    const [historys, setHistorys] = useState<Game[]>()
    const [refreshIndex, setRefreshIndex] = useState(0);

    useEffect(() => {
        setLoading(true)
        fetch("/api/puzzle/history", {
            method: "GET",
        }).then(async resp => {
            if (resp.ok) {
                const res = await resp.json();
                if (res.data) {
                    setHistorys(_.map(res.data, (data) => Game.parse(data)));
                }
            }
            setLoading(false)
        });
    }, [refreshIndex])

    return (
        <div className="flex flex-col items-center justify-center md:px-5 lg:px-0 max-w-full">
            <div className="flex justify-items-center">
                <h3 className="text-lg font-semibold mb-4">游戏记录</h3>
                <Tooltip title="点击刷新">
                    <span onClick={() => setRefreshIndex(refreshIndex + 1)}><IoRefreshCircle/></span>
                </Tooltip>
            </div>
            <Table columns={columns} dataSource={historys} loading={loading}/>
        </div>);
}