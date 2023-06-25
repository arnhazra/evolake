import { Button, ButtonGroup } from 'react-bootstrap'
import { Fragment, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import jwtDecode from 'jwt-decode'
import { AppContext } from '@/context/appStateProvider'
import Show from '@/components/Show'
import SubscribeModal from '@/utils/SubscribeModal'
import UnsubscribeModal from '@/utils/UnsubscribeModal'
import { SubPlanState } from '@/types/Types'

const PricingPage: NextPage = () => {
    const [{ userState, subPlanState, subReqLimitState }] = useContext(AppContext)
    const [selectedPlan, setSelectedPlan] = useState('Standard')
    const [isSubscribeModalOpened, setSubscribeModalOpened] = useState(false)
    const [isUnsubscribeModalOpened, setUnsubscribeModalOpened] = useState(false)
    const [planPrice, setPlanPrice] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [userCurrentPlan, setUserCurrentPlan] = useState('Free')

    useEffect(() => {
        try {
            const decodedSubId: any = jwtDecode(userState.subscriptionKey)
            setTokenId(decodedSubId.tokenId)
            setUserCurrentPlan(decodedSubId.selectedPlan)
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    const hideSubscribeModal = () => {
        setSubscribeModalOpened(false)
    }

    const hideUnsubscribeModal = () => {
        setUnsubscribeModalOpened(false)
    }

    useEffect(() => {
        const planPriceKey = `${selectedPlan.toLocaleLowerCase()}SubscriptionPrice`
        const selectedPlanPrice = subPlanState[planPriceKey as keyof SubPlanState]
        setPlanPrice(selectedPlanPrice)
    }, [selectedPlan])

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Pricing<i className="fa-solid fa-money-check-dollar"></i></p>
                <p>Choose your plan</p>
                <ButtonGroup className='btn-group-card'>
                    <Button className={selectedPlan === 'Standard' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Standard')}>STANDARD</Button>
                    <Button className={selectedPlan === 'Premium' ? 'btn-grp-btn-sel' : 'btn-grp-btn'} onClick={(): void => setSelectedPlan('Premium')}>PREMIUM</Button>
                </ButtonGroup>
                <div className='plans mt-2'>
                    <Show when={selectedPlan === 'Standard'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.standardSubscriptionPrice} MATIC/mo</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Data API</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>{subReqLimitState.standardSubscriptionReqLimit} API requests/month</p>
                        <Show when={selectedPlan === userCurrentPlan}>
                            <Button disabled className='btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></Button>
                        </Show>
                        <Show when={selectedPlan !== userCurrentPlan}>
                            <Button className='btn-block' disabled={userState.subscriptionKey.length > 0} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                        </Show>
                    </Show>
                    <Show when={selectedPlan === 'Premium'}>
                        <p className='branding text-center'><i className='fa-brands fa-ethereum'></i>{subPlanState.premiumSubscriptionPrice} MATIC/mo</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>Data API</p>
                        <p className='lead'><i className='fa-solid fa-circle-check'></i>{subReqLimitState.premiumSubscriptionReqLimit} API requests/month</p>
                        <Show when={selectedPlan === userCurrentPlan}>
                            <Button disabled className='btn-block'>Current Plan <i className='fa-solid fa-circle-check'></i></Button>
                        </Show>
                        <Show when={selectedPlan !== userCurrentPlan}>
                            <Button className='btn-block' disabled={userState.subscriptionKey.length > 0} onClick={() => setSubscribeModalOpened(true)}>Pay & Subscribe<i className="fa-solid fa-lock"></i></Button>
                        </Show>
                    </Show>
                </div>
            </div>
            <SubscribeModal price={Number(planPrice) * 10000} isOpened={isSubscribeModalOpened} closeModal={() => { hideSubscribeModal() }} selectedPlan={selectedPlan} />
            <UnsubscribeModal tokenId={tokenId} refundAmount={Number(0.20) * 5000} isOpened={isUnsubscribeModalOpened} closeModal={() => { hideUnsubscribeModal() }} />
        </Fragment>
    )
}

export default PricingPage