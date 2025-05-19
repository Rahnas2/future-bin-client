import { object, string, ref, mixed } from 'yup'

export interface basicInfoSchemaType {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

export const basicInfoSchema = object({
    firstName: string().trim().required('First name is required'),
    lastName: string().trim().required('Last name is required'),
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required('Confirm Password is required')
});


export interface loginSchemaType {
    email?: string,
    password?: string
}
export const loginSchema = object({
    email: string().trim().required().email('Invalid email'),
    password: string().trim().required('password is required')
})

export interface adminLoginSchemaType extends loginSchemaType {
    secret?: string
}

export const adminLoginSchema = object({
    email: string().trim().required().email('Invalid email'),
    password: string().trim().required('password is required'),
    secret: string().trim().required('secret is required')
})

export interface completeProfileType {
    role?: string;
    mobile?: string;
    address?: {
        street: string;
        houseNo: string;
        district: string;
        city: string;
        pincode: string;
    };
    profileImg?: File;
    vehicleDetails?: {
        model: string;
        licensePlate: string;
    };
    idCard?: {
        front: File;
        back: File;
    };
    vehicleImg?: File;
};

// Validation schema
export const completeProfileSchema = object({
    mobile: string().trim()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    address: object({
        street: string().trim().required('Street address is required'),
        houseNo: string().trim().required('House number is required'),
        district: string().trim().required('District is required'),
        city: string().trim().required('City is required'),
        pincode: string().trim()
            .required('Pincode is required')
            .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
    }),

    profileImg: mixed()
        .notRequired()
        .test("fileType", "ojnly images are allowed", (value) => {
            if (!value) return true
            return value instanceof File && value.type.startsWith("image/");
        }),

    idCard: mixed().when("role", ([role], schema) =>
        role === "collector"
            ? object({
                front: mixed()
                    .required("ID card front image is required")
                    .test("fileType", "Only images are allowed", (value) => {
                        if (!value) return false;
                        return value instanceof File && value.type.startsWith("image/");
                    }),
                back: mixed()
                    .required("ID card back image is required")
                    .test("fileType", "only images are allowed", (value) => {
                        if (!value) return false;
                        return value instanceof File && value.type.startsWith("image/");

                    }),
            })
            : schema
    ),

    // Add collector-specific validations
    vehicleDetails: mixed().when("role", ([role], schema) =>
        role === "collector"
            ? object({
                model: string().trim().required("Vehicle model is required"),
                licensePlate: string().trim().required("License plate is required"),
            })
            : schema
    ),
    vehicleImg: mixed().when("role", ([role], schema) =>
        role === "collector"
            ? mixed()
                .required("Vehicle image is required")
                .test("fileType", "Only images are allowed", (value) => {
                    if (!value) return false;
                    return value instanceof File && value.type.startsWith("image/");
                })
            : schema
    )
});

export interface editProfileType {
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    profileImage: string | null,
}

export const editProfileSchema = object({
    firstName: string().trim().required('First name is required'),
    lastName: string().trim().required('Last name is required'),
    email: string().required('Email is required').email('Invalid email'),
    mobile: string().trim()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    profileImage: mixed()
        .notRequired()
        .test("fileType", "only images are allowed", (value) => {
            if (!value) return true
            return value instanceof File && value.type.startsWith("image/");
        }),
})

export interface changePasswordType {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const passwordSchema = object({
    newPassword: string().required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: string()
        .required('Confirm Password is required')
        .oneOf([ref('newPassword')], 'Passwords must match')
})

export const changePasswordSchema = passwordSchema.shape({
    currentPassword: string().trim().required('required')
    // newPassword: string().required('Password is required')
    //     .min(8, 'Password must be at least 8 characters long')
    //     .matches(
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //         'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    //     ),
    // confirmPassword: string()
    //     .required('Confirm Password is required')
    //     .oneOf([ref('newPassword')], 'Passwords must match')

})