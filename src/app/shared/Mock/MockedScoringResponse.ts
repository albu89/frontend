import { ScoringResponse } from '../ScoringResponse';
import { Prevalence } from '../ScoringResponseSchema';
import { MockedBiomarkersInfo } from './MockedBiomarkersInfo';
import { MockedWarning } from './MockedWarning';
export class MockedScoringResponse implements ScoringResponse {
  public classifierClass = 1;
  public classifierScore = 0.23;
  public classifierSign = 0;
  public requestId = '123ADE';
  public riskValue = '<5%';
  public riskClass = 1;
  public warnings = [new MockedWarning()];
  public recommendationSummary = 'No diagnostic testing mandated.';
  public recommendationLongText =
    'This is additional Text that explains the Recommendation in more detail. The more detailed this information is, the more space it is going to take up. This is an extreme example to show what would happen with very long texts that explain a lot of detail. Eiusmod nulla reprehenderit ea reprehenderit consequat elit ex esse sint eiusmod non id consequat. Pariatur proident adipisicing laborum velit officia ea fugiat. Ipsum tempor ipsum sit duis. Labore labore veniam officia proident cupidatat officia proident fugiat. Proident sit tempor in aliqua anim culpa nulla dolore sint quis. Eiusmod excepteur mollit mollit eiusmod ad est excepteur nisi ullamco qui. Enim sit ut irure magna officia velit velit. Laborum aute anim laborum nisi. Fugiat sit ad esse reprehenderit est ea pariatur ea dolor minim qui commodo. Ullamco cupidatat esse sint tempor ut enim Lorem nisi exercitation quis velit. Lorem irure cupidatat ullamco adipisicing aliquip eiusmod pariatur magna velit fugiat et deserunt duis laborum.Ea dolore ea irure nostrud eiusmod aute magna anim nostrud velit proident est elit incididunt. Enim voluptate sint ea enim incididunt. Minim duis do dolore irure cillum enim ea.';
  public biomarkers = new MockedBiomarkersInfo();
  public prevalence: Prevalence = Prevalence.Secondary;
  public canEdit = false;
}
