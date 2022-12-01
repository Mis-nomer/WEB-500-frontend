import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import CreatableSelect from 'react-select/creatable'
import 'react-datepicker/dist/react-datepicker.css'

interface Tag {
  label: string
  value: string
  color: string
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Select Input
const options = [
  { value: 'chocolate', label: 'Chocolate', color: 'brown' },
  { value: 'strawberry', label: 'Strawberry', color: 'tomato' },
  { value: 'vanilla', label: 'Vanilla', color: 'aliceblue' },
]

// Select CSS
const Style = styled.div/*css*/ `
`

export default function ({ modalState }: { modalState: Boolean }) {
  const [isFocused, setIsFocused] = useState('none')
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [repeatDays, setRepeatDays] = useState<string[]>([])
  const [tags, setTags] = useState<Tag[] | null[]>([])

  const handleDayPicker = function ({ target }: { target: HTMLElement }) {
    if (repeatDays.includes(target?.id)) {
      setRepeatDays(repeatDays.filter(d => d != target?.id))
    } else {
      setRepeatDays([...repeatDays, target?.id])
    }
  }

  return (
    <Style>
      <div>
        <div className={`absolute inset-0 bg-black bg-opacity-30 w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
          <div className={`relative w-10/12 md:w-1/2 my-5 rounded-md shadow-lg bg-[#084c61] transition-opacity duration-300`}>
            <form action='' method='post' onBlur={() => setIsFocused('none')}>
              {/* Title */}
              <div className={`transition-colors py-4 p-8 text-sm text-white ${isFocused == 'title' && 'bg-[#ffc857]'} font-medium`}>
                <label htmlFor='title' className={`transition-all ${isFocused == 'title' && 'text-lg'}`}>
                  Title
                </label>
                <input
                  autoFocus={true}
                  onFocus={() => setIsFocused('title')}
                  type='text'
                  name='title'
                  id='title'
                  className='w-full block p-2 my-1 focus:outline-none text-medium text-[#084c61] rounded-sm'
                />
              </div>
              {/* Tags/Labels */}
              <div className={`transition-colors py-4 p-8 text-sm text-white ${isFocused == 'tags' && 'bg-[#ffc857]'} font-medium`}>
                <label htmlFor='tags' className={`transition-all ${isFocused == 'tags' && 'text-lg'}`}>
                  Labels
                </label>
                <CreatableSelect
                  className='w-full block my-1 focus:outline-none text-medium text-[#084c61]'
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: '0px solid transparent',
                      outlineWidth: '0px',
                    }),
                    multiValue: (styles, { data }) => {
                      return {
                        ...styles,
                        // ...dot(data?.color),
                      }
                    },
                  }}
                  isMulti
                  isClearable
                  defaultValue={tags}
                  onChange={setTags}
                  onFocus={() => setIsFocused('tags')}
                  options={options}
                />
              </div>
              {/* Description */}
              <div className={`transition-colors py-4 p-8 text-sm text-white ${isFocused == 'description' && 'bg-[#ffc857]'} font-medium`}>
                <label htmlFor='title' className={`transition-all ${isFocused == 'description' && 'text-lg'}`}>
                  Description
                </label>
                <textarea
                  onFocus={() => setIsFocused('description')}
                  name='description'
                  id='description'
                  className='w-full block p-2 my-1 focus:outline-none text- text-[#084c61] resize-none'
                ></textarea>
              </div>
              {/* Start Date */}
              <div className={`transition-colors py-4 p-8 text-sm text-white ${isFocused == 'startDate' && 'bg-[#ffc857]'} font-medium`}>
                <label htmlFor='title' className={`transition-all ${isFocused == 'startDate' && 'text-lg'}`}>
                  Start Date
                </label>
                <DatePicker
                  className='w-full block p-2 my-1 focus:outline-none text-medium text-[#084c61]'
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  onFocus={() => setIsFocused('startDate')}
                />
              </div>
              <div
                onClick={() => setIsFocused('repeat')}
                className={`transition-colors py-4 p-8 h-full text-white ${isFocused == 'repeat' && 'bg-[#ffc857]'} font-medium`}
              >
                <p className={`transition-all text-sm mb-2 ${isFocused == 'repeat' && 'text-lg'}`}>Repeat</p>
                <div className='w-8/12 mx-auto'>
                  <div className='flex flex-wrap justify-between items-center text-center gap-2'>
                    {weekdays.map(day => (
                      <div key={day} className='flex-1 '>
                        <label
                          htmlFor={day}
                          className={`transition-colors py-2.5 px-0.5 w-11/12 block rounded-full text-sm object-cover select-none cursor-pointer pointer-event-none  ${
                            repeatDays.includes(day) ? (isFocused == 'repeat' ? 'bg-[#084c61]' : 'bg-green-500') : ''
                          }`}
                        >
                          {day}
                          <input type='checkbox' className='hidden pointer-event-none' name={day} id={day} onChange={handleDayPicker} />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Style>
  )
}
