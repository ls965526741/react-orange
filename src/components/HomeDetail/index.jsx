import React, { useState, useEffect } from 'react'
import { getList } from '../../api/projectManagement'
import { formatDate } from '../../utils'
import './index.less'
export default function HomeDetail() {
  const [list, listState] = useState([])
  useEffect(() => {
    getListAsy()
    return () => {
      listState()
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  const getListAsy = (async () => {
    const { data: { data: { rows } } } = await getList({
      is_recycle: 0,
      is_archived: 0,
    });
    const newRows = rows.map(item => {
      item.created_at_humanize = formatDate(item.created_at)
      return item
    })
    listState(newRows)
  })
  return (
    <div className='home-detail'>
      {list?.map(item => (
        <div key={item.id} className='detail-item'>
          <img src={item.cover} alt="" />
          <div>{item.name}</div>
          <div className='intro'>{item.intro || '暂无介绍'}</div>
          <div className="foot">
            <div className="username">{item.creator && item.creator.username}</div>
            <div className="created_at">{item.created_at_humanize}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
