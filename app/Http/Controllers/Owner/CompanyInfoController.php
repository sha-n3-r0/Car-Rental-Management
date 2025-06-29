<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyInfo;
use App\Models\CompanyDocument;
use Inertia\Inertia;

class CompanyInfoController extends Controller
{
    public function index()
    {
        // Automatically create a company record if it doesn't exist
        $company = CompanyInfo::firstOrCreate([]);

        return Inertia::render('Owner/CompanyInfo', [
            'company' => $company
        ]);
    }

    public function update(Request $request, CompanyInfo $companyInfo)
    {
        $data = $request->validate([
            'logo' => 'nullable|image',
            'mission' => 'nullable|string',
            'vision' => 'nullable|string',
            'location' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'certificates.*' => 'nullable|file',
            'proof_of_transactions.*' => 'nullable|file',
        ]);

        // Upload logo if present
        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('uploads', 'public');
        }

        // Load existing JSON file paths
        $existingCertificates = json_decode($companyInfo->certificates ?? '[]', true);
        $existingProofs = json_decode($companyInfo->proof_of_transactions ?? '[]', true);

        $newCertificatePaths = [];
        $newProofPaths = [];

        // Save new certificates and append
        if ($request->hasFile('certificates')) {
            foreach ($request->file('certificates') as $file) {
                $path = $file->store('uploads', 'public');
                CompanyDocument::create([
                    'company_info_id' => $companyInfo->id,
                    'type' => 'certificate',
                    'path' => $path,
                ]);
                $newCertificatePaths[] = $path;
            }
        }

        // Save new proof of transactions and append
        if ($request->hasFile('proof_of_transactions')) {
            foreach ($request->file('proof_of_transactions') as $file) {
                $path = $file->store('uploads', 'public');
                CompanyDocument::create([
                    'company_info_id' => $companyInfo->id,
                    'type' => 'proof',
                    'path' => $path,
                ]);
                $newProofPaths[] = $path;
            }
        }

        // Append to existing paths
        $data['certificates'] = json_encode(array_merge($existingCertificates, $newCertificatePaths));
        $data['proof_of_transactions'] = json_encode(array_merge($existingProofs, $newProofPaths));

        $companyInfo->update($data);

        return redirect()->back()->with('success', 'Company info updated and documents added.');
    }

    public function contact()
    {
        $company = CompanyInfo::first(); // fetch the first company info
        return Inertia::render('Contact', [
            'company' => $company
        ]);
    }
}
