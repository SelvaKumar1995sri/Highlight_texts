import { Box, Typography } from '@mui/material';

export default function ParentalConflict({ selectedSidebarTab }) {
  return (
    <Box>
      <Typography
        component="h2"
        id="Parenting Conflict"
        sx={{
          textTransform: 'capitalize',
          fontWeight: 600,
          fontSize: '1.125rem',
          color: '#22242C',
          fontFamily: 'Work Sans, sans-serif',
          letterSpacing: 0,
          marginBottom: 2,

        }}
      >
        {selectedSidebarTab}
      </Typography>
      <Box
        component="section"
        role="region"
        aria-labelledby="section-title"
        tabIndex={0}
        sx={{
          minHeight: 390,
          height: 390,
          width: 710,
          overflowY: 'auto',
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" component="div" sx={{p: 0, color: '#22242C', fontFamily: 'Work Sans, sans-serif', letterSpacing:0, fontSize:16, lineHeight: '150%', fontWeight: 400 }}>
          <p style={{marginTop:0}}>Conflict between parents is detrimental to children’s adjustment post-divorce.</p>
          <ul style={{marginLeft:-8}}>
            <li>
              The more parental conflict there is, the higher the risk for adjustment problems to
              children. These adjustment problems are academic, emotional, social, and even health
              related (El-Sheikh & Erath, 2011; Van Dijk et al., 2020). Interparental conflict that
              is characterized as hostile, frequent, and child-related are particularly harmful to a
              child’s wellbeing (van Eldik et al., 2020).
            </li>
            <li>
              Researchers have proposed that parent conflict activates the body’s biological stress
              response system to change hormone levels, biological systems like sleep, and physical
              health (Davidson et al., 2014). Kuhlman et al. (2018) have found that children living
              in environments characterized by high levels of interparental conflict have an
              exaggerated stress response when faced with a stressor.
            </li>
            <li>
              Conflict between parents after divorce can be lower, higher, or the same as conflict
              levels pre-divorce (Cao et al., 2022). The literature has also focused on the relative
              contributions of pre- and post-divorce conflict. Booth and Amato (2001) reported that
              children’s adjustment difficulties decrease when a high conflict marriage ends in
              divorce and thus, the conflict dissipates. On the other hand, parental divorce in a
              low-conflict marriage seems to have more negative effects on children’s well-being.
            </li>
          </ul>
          <Typography component="h3" sx={{ fontWeight: 600,letterSpacing:0,fontFamily: 'Work Sans, sans-serif' }}>
            References:
          </Typography>
          <p>
            Booth, A., & Amato, P. R. (2001). Parental predivorce relations and Offspring
            Postdivorce Well‐Being. Journal of Marriage and the Family/Journal of Marriage and Family, 63(1), 197–212.{' '}
            <a
              href="https://doi.org/10.1111/j.1741-3737.2001.00197.x"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1111/j.1741-3737.2001.00197.x
            </a>
          </p>
          <p>
            Cao, H., Fine, M. A., & Zhou, N. (2022). The Divorce Process and Child Adaptation
            Trajectory Typology (DPCATT) Model: The Shaping Role of predivorce and Postdivorce
            Interparental Conflict. Clinical Child and Family Psychology Review, 25(3),
            500–528.{' '}
            <a
              href="https://doi.org/10.1007/s10567-022-00379-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1007/s10567-022-00379-3
            </a>
          </p>
          <p>
            Davidson, R. D., O’Hara, K. L., & Beck, C. J. A. (2014). Psychological and Biological
            Processes in Children Associated with High Conflict Parental Divorce.{' '}
            Juvenile & Family Court Journal, 65(1), 29–44.{' '}
            <a
              href="https://doi.org/10.1111/jfcj.12015"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1111/jfcj.12015
            </a>
          </p>
          <p>
            El-Sheikh, M., & Erath, S. A. (2011). Family conflict, autonomic nervous system
            functioning, and child adaptation: State of the science and future directions.{' '}
            <em>Development and Psychopathology</em>, 23(2), 703–721.{' '}
            <a
              href="https://doi.org/10.1017/S0954579411000034"
              target="_blank"
              rel="noopener noreferrer"
            >
              doi:10.1017/S0954579411000034
            </a>
          </p>
          <p>
            Kuhlman, K. R., Repetti, R. L., Reynolds, B. M., & Robles, T. F. (2018). Interparental
            conflict and child HPA-axis responses to acute stress: Insights using intensive repeated
            measures. Journal of Family Psychology, 32(6), 773–782.{' '}
            <a
              href="https://doi.org/10.1037/fam0000437"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1037/fam0000437
            </a>
          </p>
          <p>
            Van Dijk, R., Van Der Valk, I. E., Deković, M., & Branje, S. (2020). A meta-analysis on
            interparental conflict, parenting, and child adjustment in divorced families: Examining
            mediation using meta-analytic structural equation models.{' '}
            Clinical Psychology Review, 79, 101861.{' '}
            <a
              href="https://doi.org/10.1016/j.cpr.2020.101861"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1016/j.cpr.2020.101861
            </a>
          </p>
          <p>
            Van Eldik, W. M., De Haan, A. D., Parry, L. Q., Davies, P. T., Luijk, M. P. C. M.,
            Arends, L. R., & Prinzie, P. (2020). The interparental relationship: Meta-analytic
            associations with children’s maladjustment and responses to interparental conflict.{' '}
            Psychological Bulletin, 146(7), 553–594.{' '}
            <a
              href="https://doi.org/10.1037/bul0000233"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/10.1037/bul0000233
            </a>
          </p>
        </Typography>
      </Box>
    </Box>
  );
}