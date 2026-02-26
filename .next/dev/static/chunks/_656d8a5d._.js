(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "apiFetch",
    ()=>apiFetch,
    "getStoredSession",
    ()=>getStoredSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const normalizeBaseUrl = ()=>{
    const raw = ("TURBOPACK compile-time value", "https://payment-admin-dashboard-backend.vercel.app")?.replace(/\/$/, '');
    if (raw) {
        return raw.endsWith('/api') ? raw : `${raw}/api`;
    }
    return 'https://payment-admin-dashboard-backend.vercel.app/api';
};
const API_BASE_URL = normalizeBaseUrl();
const apiFetch = async (path, options = {})=>{
    const { method = 'GET', body, token } = options;
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Request failed');
    }
    if (response.status === 204) {
        return null;
    }
    return await response.json();
};
const getStoredSession = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = localStorage.getItem('payflow-auth');
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(auth)/otp/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OtpPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const SESSION_DURATION_MS = 1 * 60 * 1000;
function OtpPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array.from({
        length: 6
    }, {
        "OtpPage.useState": ()=>''
    }["OtpPage.useState"]));
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingEmail, setPendingEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const inputsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OtpPage.useEffect": ()=>{
            const pending = localStorage.getItem('payflow-pending');
            if (!pending) {
                router.replace('/login');
                return;
            }
            try {
                const parsed = JSON.parse(pending);
                setPendingEmail(parsed?.email ?? '');
            } catch  {
            // ignore
            }
        }
    }["OtpPage.useEffect"], [
        router
    ]);
    const handleChange = (index, value)=>{
        if (!/^[0-9]?$/.test(value)) {
            return;
        }
        const next = [
            ...otp
        ];
        next[index] = value;
        setOtp(next);
        if (value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (index, event)=>{
        if (event.key === 'Backspace' && !otp[index] && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1]?.focus();
        }
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError('');
        setIsLoading(true);
        const code = otp.join('');
        if (code.length < 6) {
            setError('Enter the 6-digit code to continue.');
            setIsLoading(false);
            return;
        }
        try {
            const pendingRaw = localStorage.getItem('payflow-pending');
            const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
            const verifyResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])('/auth/otp/verify', {
                method: 'POST',
                body: {
                    email: pending?.email,
                    code,
                    requestId: pending?.requestId
                }
            });
            const expiresAt = verifyResponse?.expiresIn ? Date.now() + verifyResponse.expiresIn * 1000 : Date.now() + SESSION_DURATION_MS;
            localStorage.setItem('payflow-auth', JSON.stringify({
                email: pending?.email,
                mode: 'login',
                lastLogin: new Date().toISOString(),
                expiresAt,
                role: pending?.role ?? 'admin',
                accessToken: verifyResponse?.accessToken ?? null,
                refreshToken: verifyResponse?.refreshToken ?? null
            }));
            localStorage.removeItem('payflow-pending');
            router.push('/');
        } catch (err) {
            setError('OTP verification failed. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    const handleResend = async ()=>{
        try {
            const pendingRaw = localStorage.getItem('payflow-pending');
            const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])('/auth/otp/request', {
                method: 'POST',
                body: {
                    email: pending?.email
                }
            });
            setError('A new OTP was requested.');
        } catch (err) {
            setError('Unable to request a new OTP.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-fade-up",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400",
                        children: "Account Setup"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-slate-900",
                        children: "Verify your email"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-500",
                        children: [
                            "We sent a 6-digit verification code to",
                            ' ',
                            pendingEmail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-slate-700",
                                children: pendingEmail
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this) : 'your email address',
                            ". Enter it below to complete your registration and get started."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "space-y-5",
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: otp.map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: (element)=>{
                                    inputsRef.current[index] = element;
                                },
                                value: digit,
                                onChange: (event)=>handleChange(index, event.target.value),
                                onKeyDown: (event)=>handleKeyDown(index, event),
                                inputMode: "numeric",
                                maxLength: 1,
                                className: "h-12 w-12 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                            }, index, false, {
                                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isLoading,
                        className: "flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400",
                        children: isLoading ? 'Verifying...' : 'Complete setup'
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs text-slate-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Did not receive a code?"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "font-semibold text-slate-900 hover:underline",
                                onClick: handleResend,
                                children: "Resend"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(auth)/otp/page.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(auth)/otp/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(auth)/otp/page.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_s(OtpPage, "SH3PlTRFTi/Pf1GZJ0cp/onWJ9c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OtpPage;
var _c;
__turbopack_context__.k.register(_c, "OtpPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_656d8a5d._.js.map