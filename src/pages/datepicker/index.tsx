import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";

import _ from 'lodash';
import Moment from 'moment';
// Consts and Libs
// import AppUtil from '@/lib/utils';
// import { AppConfig, Constants } from '../../constants';
// Components

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';



const DatePickerPage = () => {
    // const [value, onChange] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    const [endDate, setEndDate] = useState(null);
    
    
    const onChange = (dates: any) => {
        const [start, end] = dates;
        console.log(start, end);
        setStartDate(start);
        setEndDate(end);
    };

    // useEffect(() => {
    //     console.log(startDate);
    //     console.log(endDate);
    // }, [startDate, endDate])
    // // create an array of dates between 15th and 20th March
    // const getDates = () => {
    //     const dates = [];
    //     const startDate = new Date();
    //     const endDate = new Date();
    //     endDate.setDate(endDate.getDate() + 5);
    //     while (startDate < endDate) {
    //         dates.push(new Date(startDate));
    //         startDate.setDate(startDate.getDate() + 1);
    //     }
    //     return dates;
    // }
    // console.log(getDates());

    // const [date, setDate] = useState(
    //     (Moment().startOf('day'))
    // );

    // const [showDatePicker, setShowDatePicker] = useState(false);

    // let maxDate, minDate = Moment().startOf('day'), selectDate = date;

    // const onSelect = (date) => {
    //     setDate(Moment(date));
    //     setShowDatePicker(false);
    // };

    return (
        <div>
            {/* <div className={'border p-3 rounded'}>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <React.Fragment>
                            <div className={'a'} onClick={() => setShowDatePicker(!showDatePicker)}>
                                <p className={'small text-muted mb-0'}>
                                    <FontAwesomeIcon icon={faCalendarAlt} size={'sm'} className={'blue-cl mr-1'} /> Date
                                </p>
                                <p className={'mb-0'}>{selectDate.toString()}</p>
                            </div>
                            <div className={(showDatePicker ? 'collapse.show' : 'collapse') + ' position-absolute'} id="datePicker">
                                <div className="bg-white">
                                    <div className="text-left">
                                        {showDatePicker &&
                                            <Calendar
                                                selectRange={false}
                                                onChange={onSelect}
                                                className={'mx-auto'}
                                                minDate={minDate.toDate()}
                                                value={selectDate.toDate()}
                                                maxDate={null}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                        <React.Fragment>
                            <div>
                                <p className={'small text-muted mb-0'}>
                                    <FontAwesomeIcon icon={faCalendarAlt} size={'sm'} className={'blue-cl mr-1'} /> Date
                                </p>
                                <p className={'mb-0'}>{selectDate.toString()}</p>
                            </div>
                        </React.Fragment>
                    </div>
                    <div className={'col-6 d-grid'}>
                        <button
                            className={'btn btn-primary'}
                            disabled={false}
                            onClick={() => console.log('get availability')}
                        >Get Availability</button>
                    </div>
                </div>
            </div> */}
            {/* <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                showTimeSelect    
            />
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={getDates()}
                selectsRange
                // selectsDisabledDaysInRange
                inline
            />
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={getDates()}
                selectsRange
                selectsDisabledDaysInRange
                inline
            /> */}

            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                filterDate={isWeekday}
                placeholderText="Select a weekday"
                selectsRange
                inline
            />

        </div>
    )
}

export default DatePickerPage