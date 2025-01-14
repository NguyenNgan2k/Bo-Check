import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { memo } from "react";
import { connect, useDispatch } from "react-redux";
import DatagridHeader from "./DatagridHeader";
import DatagridRowGroup from "./DatagridRowGroup";
import { setSymbolScroll } from 'containers/client/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InfiniteScroll from "react-infinite-scroll-component";
import { usePrevious } from 'lib/useHook';
import * as _ from 'lodash';

function TblGroup(props) {
    const dispatch = useDispatch();
    const { partSnap, symScroll } = props;
    const [subPartSnap, setSubPartSnap] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const prePartSnap = usePrevious(partSnap);

    useEffect(() => {
        if (symScroll) {
            scrollTo(symScroll);
            dispatch(setSymbolScroll(null));
        }

    }, [symScroll])

    const scrollTo = (id) => {
        let rootRoll = document.getElementById(id + 'row')
        const a = document.getElementById('start').scrollTop + document.getElementById('start').scrollHeight
        if (rootRoll) {
            rootRoll.scrollIntoView();
            rootRoll.classList.add('chose')
        }
        setTimeout(() => {
            if (rootRoll)
                rootRoll.classList.remove('chose')
        }, 1500)
    };
    console.log(partSnap)
    console.log(subPartSnap)

    useEffect(() => {
        if (partSnap && !_.isEqual(partSnap, prePartSnap)) {
            setSubPartSnap(partSnap.slice(0, 20));
        }
    }, [partSnap])

    const fetchMoreData = () => {
        // 20 more records in 0.5 secs
        setTimeout(() => {
            if (subPartSnap && partSnap && subPartSnap.length < partSnap.length) {
                setIsLoad(true)
                let length = subPartSnap.length + 20;
                setSubPartSnap(partSnap.slice(0, length));
            }
            else setIsLoad(false)
        }, 500);
    };
    return (
        <Fragment>
            <div style={{ margin: '16px 170px 16px 0' }} id="banggia">
                <table style={{ width: "100%" }}>
                    <colgroup>
                        {/* Mã */}
                        <col width="4.0%"></col>
                        {/* cell */}
                        <col width="3.4%"></col>
                        {/* tc */}
                        <col width="3.4%"></col>
                        {/* f */}
                        <col width="3.4%"></col>
                        {/* tong kl */}
                        <col width="4.2%"></col>
                        {/* g3 */}
                        <col width="3.4%"></col>
                        {/* v3 */}
                        <col width="3.4%"></col>
                        {/* g2 */}
                        <col width="3.4%"></col>
                        {/* v2 */}
                        <col width="3.4%"></col>
                        {/* g1 */}
                        <col width="3.4%"></col>
                        {/* g1 */}
                        <col width="3.4%"></col>

                        <col width="4.0%"></col>
                        <col width="4.0%"></col>
                        <col width="4.0%"></col>

                        {/* g1 */}
                        <col width="3.4%"></col>
                        {/* v1 */}
                        <col width="3.4%"></col>
                        {/* g2 */}
                        <col width="3.4%"></col>
                        {/* v2 */}
                        <col width="3.4%"></col>
                        {/* g3 */}
                        <col width="3.4%"></col>
                        {/* g3 */}
                        <col width="3.4%"></col>

                        <col width="4.0%"></col>
                        <col width="4.0%"></col>
                        <col width="4.0%"></col>

                        <col width="3.4%"></col>
                        <col width="3.4%"></col>
                    </colgroup>
                    <thead id="start">
                        <DatagridHeader

                        />
                    </thead>
                </table>
                <PerfectScrollbar style={{ height: '670px', zIndex: '0' }}>

                    <InfiniteScroll
                        dataLength={subPartSnap.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={isLoad && <h4>Loading...</h4>}
                    >
                        <table className="w-100">
                            <colgroup>
                                {/* Mã */}
                                <col width="4.0%"></col>
                                {/* cell */}
                                <col width="3.4%"></col>
                                {/* tc */}
                                <col width="3.4%"></col>
                                {/* f */}
                                <col width="3.4%"></col>
                                {/* tong kl */}
                                <col width="4.2%"></col>
                                {/* g3 */}
                                <col width="3.4%"></col>
                                {/* v3 */}
                                <col width="3.4%"></col>
                                {/* g2 */}
                                <col width="3.4%"></col>
                                {/* v2 */}
                                <col width="3.4%"></col>
                                {/* g1 */}
                                <col width="3.4%"></col>
                                {/* g1 */}
                                <col width="3.4%"></col>

                                <col width="4.0%"></col>
                                <col width="4.0%"></col>
                                <col width="4.0%"></col>

                                {/* g1 */}
                                <col width="3.4%"></col>
                                {/* v1 */}
                                <col width="3.4%"></col>
                                {/* g2 */}
                                <col width="3.4%"></col>
                                {/* v2 */}
                                <col width="3.4%"></col>
                                {/* g3 */}
                                <col width="3.4%"></col>
                                {/* g3 */}
                                <col width="3.4%"></col>

                                <col width="4.0%"></col>
                                <col width="4.0%"></col>
                                <col width="4.0%"></col>

                                <col width="3.4%"></col>
                                <col width="3.4%"></col>
                            </colgroup>
                            <tbody>
                                {

                                    subPartSnap && subPartSnap.map((item, index) => (
                                        <DatagridRowGroup
                                            record={item}
                                            index={index}
                                            key={`${item.sym}-${index}`}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </PerfectScrollbar>
            </div>
        </Fragment>
    );
};
const makeMapStateToProps = () => {

    const mapSateToProps = (state) => {
        return {
            symScroll: state.client.symbolScroll,
        };
    };
    return mapSateToProps;
};

export default connect(makeMapStateToProps, {

})(memo(TblGroup))

