<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CL Carhub</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <style>
        @media only screen and (max-width: 600px) {
            .inner-body {
                width: 100% !important;
            }
            .footer {
                width: 100% !important;
            }
        }
        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
        /* Optional: add some padding or styles here */
        .content-cell {
            padding: 35px;
        }
        .header {
            padding: 25px 0;
            text-align: center;
            font-weight: bold;
            font-size: 24px;
            color: #111;
        }
        .footer {
            text-align: center;
            color: #999999;
            font-size: 12px;
            padding: 20px 0;
        }
    </style>
    {!! $head ?? '' !!}
</head>
<body>

<table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
    <td align="center">
        <table class="content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            
            {{-- Custom header with app name --}}
            <tr>
                <td class="header">
                    {{ config('app.name', 'CL Carhub') }}
                </td>
            </tr>

            <!-- Email Body -->
            <tr>
                <td class="body" width="100%" cellpadding="0" cellspacing="0" style="border: none !important;">
                    <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                        <!-- Body content -->
                        <tr>
                            <td class="content-cell">
                                {!! Illuminate\Mail\Markdown::parse($slot) !!}
                                {!! $subcopy ?? '' !!}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            {{-- Custom footer --}}
            {{-- Add vertical space above footer --}}
            <tr>
                <td height="20" style="line-height: 20px; font-size: 0;">&nbsp;</td>
            </tr>

            {{-- Custom footer --}}
            <tr>
                <td class="footer" style="text-align: center; color: #999999; font-size: 12px; padding: 15px 0;">
                    &copy; {{ date('Y') }} CL Carhub. All rights reserved.
                </td>
            </tr>

            {{-- Add vertical space below footer --}}
            <tr>
                <td height="20" style="line-height: 20px; font-size: 0;">&nbsp;</td>
            </tr>

                    </table>
                </td>
            </tr>
    </table>
</body>
</html>
