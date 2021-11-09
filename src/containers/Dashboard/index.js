import React from 'react'
import DashboardPage from '../../components/Dashboard'
import MainLayout from '../../components/MainLayout'

class Dashboard extends React.Component {
  render () {
    return (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    )
  }
}

export default Dashboard