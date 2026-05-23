export default function ThankYou() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f0eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center' }}>

        {/* Eyebrow */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#c8a96e',
          marginBottom: '24px'
        }}>
          — Founding Member Waitlist —
        </p>

        {/* Headline */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '400',
          color: '#2c3e2d',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          You're on the waitlist.
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '16px',
          color: '#5a5a4a',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          We'll send next steps to your inbox within 24 hours.
        </p>

        {/* What Happens Next */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '40px 36px',
          textAlign: 'left',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{
            fontSize: '13px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            marginBottom: '24px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '600'
          }}>
            What Happens Next?
          </h2>

          {[
            'Check your inbox within 24 hours.',
            'Receive The Calm Home Childcare Blueprint and founding member details.',
            'Learn more about the July 8 founding cohort experience.',
            'Be first invited into the Mama Launch membership experience.'
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: i < 3 ? '20px' : '0'
            }}>
              <span style={{
                minWidth: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#2c3e2d',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '600',
                marginTop: '2px'
              }}>
                {i + 1}
              </span>
              <p style={{ fontSize: '15px', color: '#3a3a2e', lineHeight: '1.6', margin: '0' }}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{ fontSize: '13px', color: '#9a9a8a', marginTop: '32px' }}>
          Mama Launch Studio ·{' '}
          <a href="https://mamalaunchstudio.com" style={{ color: '#9a9a8a' }}>
            mamalaunchstudio.com
          </a>
        </p>

      </div>
    </div>
  );
}