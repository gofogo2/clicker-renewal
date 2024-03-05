'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const userListener = supabase
      .channel('public:notes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, (payload) =>
        handleAllEventsPayload(payload)
      )
      .subscribe()
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
    return () => {
      userListener.unsubscribe()
    }

  }, [])
  function handleAllEventsPayload(payload: any): void {
    // INSERT 이벤트에 대한 처리
    if (payload.eventType === 'INSERT') {
      setNotes((currentNotes) => {
        // 이미 같은 id를 가진 노트가 있는지 확인
        const isExisting = currentNotes?.some(note => note.id === payload.new.id)
        if (!isExisting&&currentNotes != null) {
          // 새로운 노트를 현재 목록에 추가
          return [...currentNotes, payload.new]
        }
        return currentNotes
      })
    }

    // 다른 이벤트 유형에 대한 처리도 여기에 추가할 수 있어
    console.log(payload)
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
