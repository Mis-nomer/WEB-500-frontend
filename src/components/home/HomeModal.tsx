import { useEffect, useState } from 'react'
import Habit from '../../controllers/controller'
import DatePicker from 'react-datepicker'
import CreatableSelect from 'react-select/creatable'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm, Controller } from 'react-hook-form'
import { IHabit } from '../../interface/habit'

// Global interfaces & variables
interface IOption {
  readonly label: string
  readonly value: string
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ({ modalState, setModalState, setIsSuccess }: { modalState: Boolean; setModalState: any; setIsSuccess: any }) {
  // component states & variables
  const [isFocused, setIsFocused] = useState('none')
  const [repeatDays, setRepeatDays] = useState<string[]>([])
  const [tagValue, setTagValue] = useState<(IOption | null)[]>([])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (data: IHabit) => {
    data.email = 'Judson.Kirlin@gmail.com'
    Habit.add('/habit/', data).then(() => {
      setModalState(!modalState)
      setIsSuccess(true)
    })
  }

  // handle weekday select
  const handleDayPicker = function ({ target }: { target: HTMLElement }) {
    if (repeatDays.includes(target?.id)) {
      setRepeatDays(repeatDays.filter(d => d != target?.id))
      setValue(
        'repeat',
        repeatDays.filter(d => d != target?.id)
      )
    } else {
      setRepeatDays([...repeatDays, target?.id])
      setValue('repeat', [...repeatDays, target?.id])
    }
  }

  // create new label from select input
  const createTag = (label: string): IOption => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  })

  const handleCreate = (inputTag: string) => {
    const newTag = createTag(inputTag)
    setTagList(prev => [...prev, newTag])
    setTagValue([...tagValue, newTag])
  }

  // Select Input
  const detaultTags = [createTag('One'), createTag('Two'), createTag('Three')]
  const [tagList, setTagList] = useState(detaultTags)

  return (
    <div>
      <div className={`absolute  inset-0 bg-black bg-opacity-30 w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
        <div className={`relative w-10/12 md:w-1/2 rounded-md shadow-lg bg-[#084c61] transition-opacity duration-300`}>
          <form onSubmit={handleSubmit(data => onSubmit(data as IHabit))} onBlur={() => setIsFocused('none')}>
            {/* Title */}
            <div className={`transition-colors pb-4 pt-6 px-8 text-sm text-white ${isFocused == 'title' && 'bg-[#ffc857]'} font-medium`}>
              <label htmlFor='title' className={`transition-all ${isFocused == 'title' && 'text-lg'}`}>
                Title
              </label>
              <input
                autoFocus={true}
                onFocus={() => setIsFocused('title')}
                type='text'
                id='title'
                className='w-full block p-2 my-1 focus:outline-none text-medium text-[#084c61] rounded-sm'
                {...register('title', { required: true, maxLength: 100 })}
              />
              {errors.title && <p className='bg-red-500 p-2 mt-2 rounded-md'>Please enter a title</p>}
            </div>
            {/* Tags/Labels */}
            <div className={`transition-colors py-4 px-8 text-sm text-white ${isFocused == 'tagList' && 'bg-[#ffc857]'} font-medium`}>
              <label htmlFor='tagList' className={`transition-all ${isFocused == 'tagList' && 'text-lg'}`}>
                Labels
              </label>
              <Controller
                control={control}
                defaultValue={[]}
                name='labels'
                render={({ field: { onChange, value } }) => (
                  <CreatableSelect
                    className='w-full block my-1 focus:outline-none text-medium text-[#084c61]'
                    value={tagList.filter(c => value.includes(c.value))}
                    onChange={selected => {
                      setTagValue(selected as IOption[])
                      onChange(selected.map(c => c.value))
                    }}
                    options={tagList}
                    onFocus={() => setIsFocused('tagList')}
                    onCreateOption={handleCreate}
                    styles={{
                      control: baseStyles => ({
                        ...baseStyles,
                        border: '0px solid transparent',
                        outlineWidth: '0px',
                      }),
                      multiValue: (styles, { data }) => {
                        return {
                          ...styles,
                        }
                      },
                    }}
                    isMulti
                    isClearable
                  />
                )}
              />
            </div>
            {/* Start Date */}
            <div className={`transition-colors py-4 px-8 text-sm text-white ${isFocused == 'startDate' && 'bg-[#ffc857]'} font-medium`}>
              <label htmlFor='startDate' className={`transition-all ${isFocused == 'startDate' && 'text-lg'}`}>
                Start Date
              </label>
              <Controller
                control={control}
                name='startDate'
                defaultValue={new Date(Date.now())}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    ref={ref}
                    placeholderText='Select start date'
                    className='w-full block p-2 my-1 focus:outline-none rounded-md text-medium text-[#084c61]'
                    selected={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused('startDate')}
                  />
                )}
              />
            </div>
            {/* Description */}
            <div className={`transition-colors py-4 px-8 text-sm text-white ${isFocused == 'description' && 'bg-[#ffc857]'} font-medium`}>
              <label htmlFor='title' className={`transition-all ${isFocused == 'description' && 'text-lg'}`}>
                Description
              </label>
              <textarea
                {...register('description', { maxLength: 300 })}
                onFocus={() => setIsFocused('description')}
                name='description'
                id='description'
                className='w-full block p-2 my-1 h-[15vh] focus:outline-none rounded-md text-[#084c61] resize-none'
              ></textarea>
            </div>
            {/* Repeat Day */}
            <div
              onClick={() => setIsFocused('repeat')}
              className={`transition-colors py-4 px-8 h-full text-white ${isFocused == 'repeat' && 'bg-[#ffc857]'} font-medium`}
            >
              <p className={`transition-all text-sm mb-2 ${isFocused == 'repeat' && 'text-lg'}`}>Repeat On:</p>
              <input type='hidden' id='repeat' value={repeatDays} {...register('repeat', { required: true })} />
              <div className='w-8/12 mx-auto'>
                <div className='flex flex-wrap justify-between items-center text-center'>
                  {weekdays.map(day => (
                    <div key={day} className='flex-1 '>
                      <label
                        htmlFor={day}
                        className={`transition-colors py-2.5 px-1 w-11/12 block rounded-full text-sm object-cover select-none cursor-pointer pointer-event-none  ${
                          repeatDays.includes(day) ? (isFocused == 'repeat' ? 'bg-[#084c61]' : 'bg-green-500') : ''
                        }`}
                      >
                        {day}
                        <input type='checkbox' className='hidden pointer-event-none' id={day} onChange={handleDayPicker} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {errors.repeat && <p className='bg-red-500 p-2 mt-2 rounded-md'>Please select at least one weekday</p>}
            </div>
            {/* Control */}
            <div className='text-medium text-white font-semibold pt-4 pb-6 px-8'>
              <button className='block w-full mb-5 px-2 py-3 rounded-md hover:bg-[#ffc857] bg-[#177e89] hover:text-black hover:cursor-pointer transition-colors'>
                <i className='fa-solid fa-plus'></i>
                <span className='px-2'>Add Habit</span>
              </button>
              <button
                onClick={() => setModalState(!modalState)}
                className={`block w-full px-2 py-3 rounded-md hover:bg-[#ffc857] bg-red-500 hover:text-black text-white hover:cursor-pointer transition-colors`}
              >
                <i className='fa-solid fa-xmark'></i>
                <span className='px-2'>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
