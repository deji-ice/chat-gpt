"use client"

import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch("/api/getGPTmodels").then((res) => res.json())

const ModelSelection = () => {
    const { data: models, isLoading } = useSWR('models', fetchModels)
    const {data:model, mutate: setModel} = useSWR("model", {
        fallbackData:"text-davinci-003"
    })
  return <div className='mt-2'>
    <Select
        className='mt-2 text-black '
        isLoading={isLoading}
        menuPosition='fixed'
        options={models?.modelOptions}
        isSearchable
        isClearable
        classNames={{
            control: (state) => "bg-[#434654] border-[#434654]"
        }}
        defaultValue={model}
        placeholder={model}
        onChange={(e)=> setModel(e.value)}
      />
  </div>;
};

export default ModelSelection;
