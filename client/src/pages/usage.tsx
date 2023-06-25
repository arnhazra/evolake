import { Fragment, useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { NextPage } from 'next'
import { AppContext } from '@/context/appStateProvider'
import { SubReqLimitState } from '@/types/Types'

const UsagePage: NextPage = () => {
    const [{ userState, subReqLimitState }] = useContext(AppContext)
    const [maxLimit, setMaxLimit] = useState('')
    const [selectedPlan, setSelectedPlan] = useState('Free')

    useEffect(() => {
        try {
            setSelectedPlan(userState.subscriptionKey.split('_')[0])
        } catch (error) {
            setSelectedPlan('Free')
        }
    }, [userState.subscriptionKey])

    useEffect(() => {
        const subReqLimitStateKey = `${selectedPlan.toLowerCase()}SubscriptionReqLimit`
        setMaxLimit(subReqLimitState[subReqLimitStateKey as keyof SubReqLimitState])
    }, [selectedPlan])

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Usage<i className="fa-solid fa-code-pull-request"></i></p>
                <p className='smalltext'>Used #API Requests</p>
                <h4>
                    {userState.subscriptionKeyUsage} API REQ
                </h4>
                <Button disabled className='btn-block'>Plan Limit {maxLimit} <i className="fa-solid fa-wifi"></i></Button>
            </div>
        </Fragment >
    )
}

export default UsagePage