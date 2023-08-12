"use client";
import { BsCheck2Circle, BsPencil } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";

export function GenericForm(props: any) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={props.form.control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    className="w-10/12"
                    placeholder={props.defaultValue}
                    {...field}
                    disabled={!isEditMode}
                  />

                  {isEditMode ? (
                    <>
                      <Button
                        className="bg-red-600 w-1/3 text-white"
                        onClick={toggleEditMode}
                      >
                        <MdOutlineCancel />
                      </Button>
                      <Button
                        className="bg-green-500 w-1/3 text-white"
                        type="submit"
                      >
                        <BsCheck2Circle />
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-lightBlack w-1/3 text-white"
                      onClick={toggleEditMode}
                    >
                      <BsPencil />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
