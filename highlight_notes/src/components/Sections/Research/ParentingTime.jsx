import { Box, Typography } from '@mui/material';

export default function ParentingTime({selectedSidebarTab}) { 
  return (
    <Box>
      <Typography component="h2"
        id="Parenting Time" sx={{ textTransform: 'capitalize', fontWeight: 600, fontSize: '1.125rem',color: '#22242C', fontFamily: 'Work Sans, sans-serif', letterSpacing: 0,
          marginBottom: 2
 }}>
        {selectedSidebarTab}
      </Typography>
      <Box sx={{
        minHeight: 390,
        height: 390,
        width: 710,
        overflowY: 'auto',
        borderRadius: 1,
      }}>
        <Typography variant="subtitle1" component="div" sx={{p: 0, color: '#22242C', fontFamily: 'Work Sans, sans-serif', letterSpacing:0, fontSize:16, lineHeight: '150%', fontWeight: 400 }}>
         <ul style={{marginTop:0,marginLeft:-8}}>
            <li>One factor to consider for children&#8217;s post-divorce adjustment is the division of parenting time. Lack of time with a parent who no longer lives with the child &#8211; often the father &#8211; puts a child at risk for a number of struggles, such as increased hostility, psychological disorders, and health problems (Baude et al., 2016; Fabricius &#38; Luecken, 2007).</li>
            <li>Current research has found that the relationship between fathers and their children gets better the more parenting time fathers have up to 50&#37;, whereas the relationship between the child and their mother is not harmed when fathers spend up to the 50&#37; time limit with the child (Fabricius et al., 2012; Vrolijk &#38; Keizer, 2021).</li>
            <li>Parents with shared physical custody have kids that are better adjusted than those that spend a minimal amount of time with one parent and live primarily with the other parent (whether that&#8217;s mother or father), regardless of the amount of conflict between the parents (Bastaits &#38; Pasteels, 2019; Nielsen, 2018).</li>
          </ul>
          <Typography component="h3" sx={{ fontWeight: 600,letterSpacing:0,fontFamily: 'Work Sans, sans-serif' }}>
            References:
          </Typography>
          <p>Bastaits, K., &#38; Pasteels, I. (2019). Is joint physical custody in the best interests of the child? Parent&#8211;child relationships and custodial arrangements. Journal of Social and Personal Relationships, 36(11&#8211;12), 3752&#8211;3772. <a href="https://doi.org/10.1177/0265407519838071" target="_blank" rel="noopener noreferrer">https://doi.org/10.1177/0265407519838071</a></p>
          <p>Baude, A., Pearson, J., &#38; Drapeau, S. (2016). Child adjustment in joint physical custody versus sole custody: A meta-analytic review. Journal of Divorce &#38; Remarriage, 57(5), 338-360.</p>
          <p>Fabricius, W. V., &#38; Luecken, L. J. (2007). Postdivorce living arrangements, parent conflict, and long-term physical health correlates for children of divorce. Journal of family psychology : JFP : Journal of the Division of Family Psychology of the American Psychological Association (Division 43), 21(2), 195&#8211;205. <a href="https://doi.org/10.1037/0893-3200.21.2.195" target="_blank" rel="noopener noreferrer">https://doi.org/10.1037/0893-3200.21.2.195</a></p>
          <p>Fabricius, W. V., Sokol, K. R., Diaz, P., &#38; Braver, S. L. (2012). Parenting time, parent conflict, parent-child relationships, and children&#8217;s physical health. In K. Kuehnle &#38; L. Drozd (Eds.), Parenting plan evaluations: Applied research for the family courts. Oxford University Press.</p>
          <p>Nielsen, L. (2018). Joint versus sole physical custody: Outcomes for children independent of family income or parental conflict. Journal of Child Custody, 15(1), 35&#8211;54. <a href="https://doi.org/10.1080/15379418.2017.1422414" target="_blank" rel="noopener noreferrer">https://doi.org/10.1080/15379418.2017.1422414</a></p>
          <p>Vrolijk, P., &#38; Keizer, R. (2021). Children&#8217;s living arrangements after divorce and the quality of the Father-Child relationship; father involvement as an important underlying mechanism. In European studies of population (pp. 101&#8211;129). <a href="https://doi.org/10.1007/978-3-030-68479-2_6" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/978-3-030-68479-2_6</a></p>
        </Typography>
      </Box>
    </Box>
  );
}