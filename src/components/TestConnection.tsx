import React, { useState } from 'react';
import { supabaseService } from '../services/SupabaseService';

export const TestConnection: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    try {
      setStatus('Testing connection...');
      const contacts = await supabaseService.getEmergencyContacts();
      setStatus('Connection successful!');
      setError('');
    } catch (err) {
      setStatus('Connection failed');
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Supabase Connection
      </button>
      {status && (
        <p className="mt-2">
          Status: <span className={error ? 'text-red-500' : 'text-green-500'}>{status}</span>
        </p>
      )}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
    </div>
  );
}; 