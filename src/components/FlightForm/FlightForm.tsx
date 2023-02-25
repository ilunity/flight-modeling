import React from "react";
import { FlightFormProps } from "./FlightForm.types";
import { useForm } from "react-hook-form";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";


interface Inputs {
  height: number,
  speed: number,
  weight: number,
  angle: number,
  size: number,
  timeInterval: number
}

export const FlightForm: React.FC<FlightFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ defaultValues: { timeInterval: 0.001 } });

  const pattern = /\d/;
  const getNumber = (str: string) => {
    return Number(str);
  };

  return (
    <Stack
      component={ "form" }
      spacing={ 2 }
      direction={ "column" }
      onSubmit={ handleSubmit((data) => onSubmit(data)) }
    >
      <TextField
        { ...register("weight", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Масса" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">кг</InputAdornment>
        } }
        error={ !!errors.weight }
      />
      <TextField
        { ...register("height", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Высота" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">м</InputAdornment>
        } }
        error={ !!errors.height }
      />
      <TextField
        { ...register("size", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Размер" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">м<sub>2</sub></InputAdornment>
        } }
        error={ !!errors.size }
      />
      <TextField
        { ...register("angle", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Угол" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">°</InputAdornment>
        } }
        error={ !!errors.angle }
      />
      <TextField
        { ...register("speed", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Скорость" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">м/с</InputAdornment>
        } }
        error={ !!errors.speed }
      />
      <TextField
        { ...register("timeInterval", {
          pattern,
          required: true,
          setValueAs: getNumber
        }) }
        label={ "Шаг времени" }
        InputProps={ {
          endAdornment: <InputAdornment sx={ { width: 30 } } position="end">c</InputAdornment>
        } }
        error={ !!errors.timeInterval }
      />
      <Button
        type={ "submit" }
        variant={ "outlined" }
      >
        Построить график
      </Button>
    </Stack>
  );
};
