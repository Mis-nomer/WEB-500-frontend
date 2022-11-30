import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import '../../heatmap.css'
import moment from 'moment'

export default function () {
  const prevMonthFirstDay  = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD hh:mm')
  const nextMonthLastDay = moment().add(1, 'months').endOf('month').format('YYYY-MM-DD hh:mm')

  return (
    <div className='w-[50%] mx-auto'>
      <CalendarHeatmap
        startDate={prevMonthFirstDay}
        endDate={nextMonthLastDay}
        values={[
          { date: '2022-11-20', count: 1 },
          { date: '2022-11-21', count: 5 },
          { date: '2022-11-26', count: 4 },
          // ...and so on
        ]}
        classForValue={value => {
          if (!value) {
            return 'color-empty'
          }
          return `color-github-${value.count}`
        }}
        showWeekdayLabels={true}
        weekdayLabels={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
        onClick={value => {
          console.log(`value count: ${value ? value.count : 0}`)
        }}
      />
    </div>
  )
}
