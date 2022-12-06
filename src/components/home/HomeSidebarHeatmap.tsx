import CalendarHeatmap from 'react-calendar-heatmap'
import styled from 'styled-components'
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'
import { IHabit } from '../../interface/habit'

const Style = styled.div/*css*/ `
  & .react-calendar-heatmap text {
    font-size: 5px;
  }

  & .react-calendar-heatmap & .react-calendar-heatmap-small-text {
    font-size: 5px;
  }

  & .react-calendar-heatmap rect:hover {
    stroke: #555;
    stroke-width: 0;
  }

  & .react-calendar-heatmap .color-empty {
    fill: #eeeeee;
  }

  & .react-calendar-heatmap .color-filled {
    fill: #8cc665;
  }

  & .react-calendar-heatmap .color-github-0 {
    fill: #eeeeee;
  }
  & .react-calendar-heatmap .color-github-1 {
    fill: #87d111;
  }
  & .react-calendar-heatmap .color-github-2 {
    fill: #ecdc63;
  }
  & .react-calendar-heatmap .color-github-3 {
    fill: #eaa03a;
  }
  & .react-calendar-heatmap .color-github-4 {
    fill: #d1261a;
  }
`

export default function ({ listHabit }: { listHabit: IHabit[] }) {
  const prevMonthFirstDay = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD hh:mm')
  const nextMonthLastDay = moment().add(1, 'months').endOf('month').format('YYYY-MM-DD hh:mm')

  let data = listHabit.reduce((arr: { date: string; count: number }[], habit) => {
    habit.streak.forEach(date => {
      const streakDateExist = arr.find(h => h.date == date)

      if (!streakDateExist) {
        // @ts-ignore
        const entry = new Map([
          ['date', date],
          ['count', 1],
        ])
        // @ts-ignore
        arr.push(Object.fromEntries(entry))
      } else {
        streakDateExist.count++
      }
    })
    return arr
  }, [])

  return (
    <Style>
      <div className=''>
        <CalendarHeatmap
          startDate={prevMonthFirstDay}
          endDate={nextMonthLastDay}
          values={data}
          classForValue={value => {
            if (!value) {
              return 'color-empty'
            }
            return `color-github-${value.count}`
          }}
          showWeekdayLabels={true}
          horizontal={false}
          weekdayLabels={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
          onClick={value => {
            console.log(`value count: ${value?.count}`)
          }}
        />
      </div>
    </Style>
  )
}
