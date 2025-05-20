import React, { useState } from "react";
import * as jose from 'jose'

const BASE_URI = new URL(import.meta.env.VITE_GRAPHQL_URI);
const JWKS_URI = new URL(BASE_URI.origin + '/.well-known/jwks');
console.log(JWKS_URI.href);

type JWK = {
  kid: string
  use: 'enc' | 'sig'
} & ({
  kty: 'EC',
  x: string
  y: string
  crv: string
} | {
  kty: 'RSA'
  n: string
  e: string
})
type JWKS = {
  keys: JWK[]
}
const jwksPromise = fetch(JWKS_URI).then(response => response.json() as Promise<JWKS>)

export default function CreateJWEScreen() {
  const [payload, setPayload] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const jwks = await jwksPromise;
    const jwkCandidate = jwks.keys.find(s => s.use === 'enc' && s.kty === 'RSA')!;
    if (!jwkCandidate) throw new Error('No valid JWK');
    const jwk = await jose.importJWK(jwkCandidate, 'RSA-OAEP-256');
    const jwt = await new jose.EncryptJWT({ 'urn:example:claim': true })
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('5m')
      .encrypt(jwk);

    setResult(jwt);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Create JWE (encrypted JWT)</h4>
      <div className="mb-3 form-floating">
        <input
          className="form-control"
          type="text"
          onChange={(event) => setPayload(event.target.value)}
          value={payload}
          placeholder="Payload (such as a JWT)"
        />
        <label className="form-label">Payload (such as a JWT)</label>
      </div>
      <button type="submit" className="btn btn-primary">Create JWE</button>

      {result && (
        <div style={{marginTop: '10px'}}>
          <textarea className="form-control">{result}</textarea>
        </div>
      )}
    </form>
  )
}