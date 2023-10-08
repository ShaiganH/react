import React, { createContext, useContext, useState } from 'react';


const FormContext = createContext();

export function FormProvider({ children }) {
    const [value, setValue] = useState(0);
    const [selectedCat, setSelectedCat] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');




    
  

  return (
    <FormContext.Provider value={{value,setValue, selectedCat, setSelectedCat, selectedDifficulty, setSelectedDifficulty }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
