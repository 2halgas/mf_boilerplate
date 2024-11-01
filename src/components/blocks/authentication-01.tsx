import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import React from "react";
import { useAuth } from "../../../src/lib/hooks/auth_hook";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    login({ id: "", name: values.login, email: "string" });
    navigate("/");
  }
  return (
    <Card className="mx-auto max-w-sm min-w-[382px]">
      <CardHeader>
        <CardTitle className="text-4xl">Вход в ЕФО</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 mb-2">
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
            <Button type="submit" variant="secondary" className="mt-4 w-full">
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
