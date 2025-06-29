import React from 'react';
import OwnerLayout from '@/Layouts/OwnerLayout';
import { useForm } from '@inertiajs/react';

export default function CompanyInfo({ company }) {
  const { data, setData, post, processing, errors } = useForm({
    logo: null,
    mission: company?.mission || '',
    vision: company?.vision || '',
    certificates: [],           // changed to array for multiple files
    proof_of_transactions: [],  // changed to array for multiple files
    location: company?.location || '',
    phone: company?.phone || '',
    email: company?.email || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData to properly send files as multipart/form-data
    const formData = new FormData();

    formData.append('mission', data.mission);
    formData.append('vision', data.vision);
    formData.append('location', data.location);
    formData.append('phone', data.phone);
    formData.append('email', data.email);

    if (data.logo) {
      formData.append('logo', data.logo);
    }

    data.certificates.forEach((file, index) => {
      formData.append(`certificates[${index}]`, file);
    });

    data.proof_of_transactions.forEach((file, index) => {
      formData.append(`proof_of_transactions[${index}]`, file);
    });

    post(`/owner/company-info/${company.id}`, {
      forceFormData: true,
      data: formData,
    });
  };

  return (
    <OwnerLayout>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6" encType="multipart/form-data">
        <h2 className="text-2xl font-bold">Edit Company Info</h2>

        <div>
          <label className="block font-medium">Mission</label>
          <textarea
            value={data.mission}
            onChange={e => setData('mission', e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.mission && <p className="text-red-600">{errors.mission}</p>}
        </div>

        <div>
          <label className="block font-medium">Vision</label>
          <textarea
            value={data.vision}
            onChange={e => setData('vision', e.target.value)}
            className="w-full border rounded p-2"
          />
          {errors.vision && <p className="text-red-600">{errors.vision}</p>}
        </div>

        <div>
          <label className="block font-medium">Logo</label>
          <input
            type="file"
            onChange={e => setData('logo', e.target.files[0])}
          />
          {errors.logo && <p className="text-red-600">{errors.logo}</p>}
        </div>

        <div>
          <label className="block font-medium">Certificates & Permits</label>
          <input
            type="file"
            multiple
            onChange={e => setData('certificates', [...e.target.files])}
          />
          {errors.certificates && <p className="text-red-600">{errors.certificates}</p>}
        </div>

        <div>
          <label className="block font-medium">Proof of Transactions</label>
          <input
            type="file"
            multiple
            onChange={e => setData('proof_of_transactions', [...e.target.files])}
          />
          {errors.proof_of_transactions && <p className="text-red-600">{errors.proof_of_transactions}</p>}
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            value={data.location}
            onChange={e => setData('location', e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </OwnerLayout>
  );
}
