import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export const Route = createFileRoute("/examples/form")({
  component: FormExampleComponent,
});

// Zod schema for validation
const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old").max(120),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof userSchema>;

function FormExampleComponent() {
  const [submittedData, setSubmittedData] = useState<UserFormData | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedData(value);
      console.log("Form submitted:", value);
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">TanStack Form Example</h1>
        <p className="text-muted-foreground text-xl">
          Type-safe forms with Zod validation
        </p>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Registration Form</CardTitle>
            <CardDescription>
              Fill out the form to see validation in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* First Name */}
              <form.Field
                name="firstName"
                validators={{
                  onChange: userSchema.shape.firstName,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Last Name */}
              <form.Field
                name="lastName"
                validators={{
                  onChange: userSchema.shape.lastName,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Doe"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: userSchema.shape.email,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Age */}
              <form.Field
                name="age"
                validators={{
                  onChange: userSchema.shape.age,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Age
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseInt(e.target.value))
                      }
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: userSchema.shape.password,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Confirm Password */}
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    if (value !== fieldApi.form.getFieldValue("password")) {
                      return "Passwords don't match";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium">
                      Confirm Password
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-600">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <Button type="submit" className="w-full">
                {form.state.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {submittedData && (
            <Card>
              <CardHeader>
                <CardTitle>Submitted Data</CardTitle>
                <CardDescription>Form submission successful!</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="rounded-lg bg-muted p-4 text-xs">
                  {JSON.stringify(
                    {
                      ...submittedData,
                      password: "********",
                      confirmPassword: "********",
                    },
                    null,
                    2
                  )}
                </pre>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Features Demonstrated</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Real-time field validation with Zod</li>
                <li>✅ Type-safe form handling</li>
                <li>✅ Custom validation rules</li>
                <li>✅ Cross-field validation (password match)</li>
                <li>✅ Error message display</li>
                <li>✅ Form submission handling</li>
                <li>✅ Loading states</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>First/Last Name:</strong> Min 2 characters
              </p>
              <p>
                <strong>Email:</strong> Valid email format
              </p>
              <p>
                <strong>Age:</strong> Between 18 and 120
              </p>
              <p>
                <strong>Password:</strong> Min 8 characters
              </p>
              <p>
                <strong>Confirm Password:</strong> Must match password
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button asChild variant="outline">
        <Link to="/examples">Back to Examples</Link>
      </Button>
    </div>
  );
}
