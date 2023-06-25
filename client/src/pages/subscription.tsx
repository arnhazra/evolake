import { Fragment, useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AppContext } from '@/context/appStateProvider'
import contractAddress from '@/constants/contractAddress'
import Link from 'next/link'
import Show from '@/components/Show'

const SubscriptionPage: NextPage = () => {
    const [{ userState }] = useContext(AppContext)
    const [selectedPlan, setSelectedPlan] = useState('Free')
    const [tokenId, setTokenId] = useState('')

    useEffect(() => {
        try {
            setSelectedPlan(userState.subscriptionKey.split('_')[0])
            setTokenId(userState.subscriptionKey.split('_')[2])
        } catch (error) {
            setTokenId('')
        }
    }, [userState.subscriptionKey])

    return (
        <Fragment>
            <div className='box'>
                <p className='branding'>Subscription <i className='fa-solid fa-circle-plus'></i></p>
                <p className='smalltext'>Active plan</p>
                <h4>
                    {selectedPlan}
                    <Show when={userState.subscriptionKey.length > 0}>
                        <Link title='Access NFT' target='_blank' passHref href={`https://mumbai.polygonscan.com/token/${contractAddress.nftContractAddress}?a=${tokenId}`}>
                            <i className="fa-solid fa-shield"></i>
                        </Link>
                    </Show>
                </h4>
                <Link className='btn btn-block' href={'/pricing'}>View Pricing <i className='fa-solid fa-circle-arrow-right'></i></Link>
            </div>
        </Fragment >
    )
}

export default SubscriptionPage