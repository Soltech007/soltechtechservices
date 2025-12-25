"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  companyName: z.string().min(2, "Company/Department name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please provide some details about your enquiry."),
});

export function TenderEnquiry() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the form data to your backend
    toast({
      title: "Enquiry Submitted",
      description: "Thank you for your interest. Our team will review your submission and respond promptly.",
    });
    form.reset();
  }

  return (
    <section className="font-apfel2">
      <div className="text-center">
        <h2 className="font-apfel2 text-3xl font-bold text-primary md:text-4xl">
          Tender Enquiry
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[#30454c]">
          For formal tender submissions or to discuss a project, please use the form below. Our business development team will get in touch with you.
        </p>
        <div className="mt-4 mb-12 w-24 h-1 bg-accent mx-auto"></div>
      </div>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Anil Kumar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Government Department / Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. National Highways Authority" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.gov.in" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message / Enquiry Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your project requirements or enquiry..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Submit Enquiry
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
