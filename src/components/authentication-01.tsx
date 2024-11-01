import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import React from "react";

export function LoginForm() {
  const formSchema = z.object({
    login: z
      .string({
        required_error: "Поле обязательно для заполнения",
      })
      .min(2, {
        message: "Логин должен содержать не менее двух символов.",
      }),
    password: z
      .string({
        required_error: "Поле обязательно для заполнения",
      })
      .min(7, {
        message: "Пароль должен содержать не менее семи символов.",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(JSON.stringify(values, null, 2));
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-4xl">Вход в ЕФО</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Введите ваш логин" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Введите ваш пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" className="w-full">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
