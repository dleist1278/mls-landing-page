export default function ThankYouGuide() {
  const steps = [
    "Check your inbox shortly for your free guide.",
    "Look through the 10 home-based kids program ideas and notice which ones feel most realistic for your home, schedule, and season of motherhood.",
    "Over the next few days, I'll send you simple next steps to help you choose your best-fit program idea.",
    "When you're ready, Mama Launch Studio can help you turn your idea into a real program with step-by-step support inside The Mama Launch Method™.",
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f0eb',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '32px 24px 48px',
      fontFamily: 'Georgia, serif'
    }}>
      <style>{`
        @media (max-width: 640px) {
          .ty-wrap { padding-top: 20px !important; }
          .ty-eyebrow { margin-bottom: 12px !important; }
          .ty-headline { margin-bottom: 16px !important; font-size: 26px !important; }
          .ty-intro-1 { margin-bottom: 14px !important; line-height: 1.6 !important; }
          .ty-intro-2 { margin-bottom: 28px !important; line-height: 1.6 !important; }
        }
      `}</style>

      <div
        className="ty-wrap"
        style={{ maxWidth: '560px', width: '100%', textAlign: 'center', paddingTop: '24px' }}
      >

        {/* Eyebrow */}
        <p
          className="ty-eyebrow"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            marginBottom: '18px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          — Free Guide —
        </p>

        {/* Headline */}
        <h1
          className="ty-headline"
          style={{
            fontSize: 'clamp(26px, 5vw, 38px)',
            fontWeight: '400',
            color: '#2c3e2d',
            marginBottom: '22px',
            lineHeight: '1.2'
          }}
        >
          You're officially on the list.
        </h1>

        {/* Intro copy — paragraph 1 */}
        <p
          className="ty-intro-1"
          style={{
            fontSize: '15px',
            color: '#5a5a4a',
            marginBottom: '14px',
            lineHeight: '1.6',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Your free guide, <em>10 Home-Based Kids Programs Moms Can Start This Month</em>, is on its way to your inbox.
        </p>

        {/* Intro copy — paragraph 2 */}
        <p
          className="ty-intro-2"
          style={{
            fontSize: '15px',
            color: '#5a5a4a',
            marginBottom: '14px',
            lineHeight: '1.6',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Inside, you'll find simple, realistic program ideas for moms who want flexible income, meaningful work, and a childcare-based business that can fit real family life.
        </p>

        {/* Intro copy — paragraph 3 */}
        <p
          className="ty-intro-2"
          style={{
            fontSize: '15px',
            color: '#5a5a4a',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '460px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Over the next few days, I'll also send you simple next steps to help you think through your best-fit model, income goals, setup needs, and launch path.
        </p>

        {/* What Happens Next card */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '36px 32px',
          textAlign: 'left',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)'
        }}>
          <h2 style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            marginBottom: '28px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: '600'
          }}>
            What Happens Next?
          </h2>

          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: i < steps.length - 1 ? '22px' : '0'
            }}>
              <span style={{
                minWidth: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#2c3e2d',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: '600',
                flexShrink: 0,
                marginTop: '1px'
              }}>
                {i + 1}
              </span>
              <p style={{
                fontSize: '15px',
                color: '#3a3a2e',
                lineHeight: '1.65',
                margin: '0'
              }}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{
          fontSize: '13px',
          color: '#9a9a8a',
          marginTop: '32px',
          fontFamily: 'Arial, sans-serif'
        }}>
          Mama Launch Studio ·{' '}
          <a href="https://mamalaunchstudio.com" style={{ color: '#9a9a8a', textDecoration: 'none' }}>
            mamalaunchstudio.com
          </a>
        </p>

      </div>
    </div>
  );
}