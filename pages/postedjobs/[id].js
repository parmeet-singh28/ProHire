import JdCard1 from '@/components/JdCard1'
import JdCard2 from '@/components/JdCard2'
import React from 'react'

function postedjobJD() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection:'column' }}>
      <JdCard1 deleteButton="true"/>
      <JdCard2 />
    </div>
  )
}

export default postedjobJD
