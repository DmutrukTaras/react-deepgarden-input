import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';

import { withClassName, OutsideClick } from 'react-deepgarden';

import Text from '../Text';

import input from '../input';

interface IDateInputProps {
	onChange: (date: string) => void;
	calendarType?: any;
	locale?: string;
	options?: Intl.DateTimeFormatOptions;
	value: any;
	disabled: boolean;
	maxDate?: Date;
	minDate?: Date;
	momentFormat?: null;
}

class DateInput extends React.Component<IDateInputProps> {
	static defaultProps = {
		calendarType: 'ISO 8601',
		locale: 'en-US',
		options: {
			timeZone: 'UTC',
			dateStyle: 'short',
		},
	};

	state = {
		isShowCalendar: false,
	};

	handleCalendarChange = (date: Date) => {
		!date.getHours() && date.setHours(Math.abs(date.getTimezoneOffset() / 60));
		this.props.onChange(date.toLocaleDateString(this.props.locale, this.props.options));
		this.toggleCalendar();
	};

	toggleCalendar = () => {
		this.setState({
			isShowCalendar: !this.state.isShowCalendar,
		});
	};

	render() {
		const date = this.props.value
			? moment(this.props.value).toDate()
			: moment().startOf('day').toDate();
		return (
			<>
				<Text
					value={this.props.value
						? this.props.momentFormat
							? moment(date).format(this.props.momentFormat)
							: date.toLocaleDateString()
						: ''}
					onClick={this.toggleCalendar}
					disabled={this.props.disabled}
				/>
				{this.state.isShowCalendar
				&& (
					<OutsideClick
						onClickOutside={this.toggleCalendar}
					>
						<div className="_DateInput__DropDown">
							<Calendar
								maxDate={this.props.maxDate}
								minDate={this.props.minDate}
								calendarType={this.props.calendarType}
								value={date}
								onChange={this.handleCalendarChange}
							/>
						</div>
					</OutsideClick>
				)}
			</>
		);
	}
}

import './index.styl';

export default withClassName('_Input')(input('_DateInput', 'div')(DateInput));
