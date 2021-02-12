/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,View,ScrollView,Text} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Button,
  TopNavigation,
  TopNavigationAction,OverflowMenu,
  BottomNavigation,BottomNavigationTab,MenuItem,
} from '@ui-kitten/components';
const BackIcon = (props) => <Icon {...props} name="arrow-forward"  fill="#fff" />;


export class SettingsScreen extends React.Component {


  constructor(props) {
    super(props);
   }

   BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={this.navigateBack}/>
  );
  navigateBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
   <TopNavigation
   style={{backgroundColor:'#3A67BF'}}
        title={evaProps => <Text {...evaProps} style={{ color: '#fff',fontFamily:'DroidKufi-Regular'}}>تطبيق فتاوى الصوم والزكاة</Text>}
        accessoryLeft={this.BackAction}
        accessoryRight={this.renderRightActions}
    />
        <Divider />
        <Layout
          style={{flex: 1}}>
        <ScrollView>

          <Text style={{margin:15,marginBottom:5,backgroundColor:'#F1F9FF',color:'#3A67BF',fontWeight:'900',fontFamily:'DroidKufi-Bold',fontSize:14,lineHeight:26,paddingVertical:10,paddingHorizontal:5,borderRadius:5}} >{`بسم الله الرحمن الرحيم

الحمد لله رب العالمين، وصلّى الله على نبينا محمد، وعلى آله وصحبه أجمعين، أما بعدُ: 
فرض الله تعالى الصيام على عباده؛ ليتقربوا به إليه، بترك ما تشتهيه أنفسهم من أنواع المآكل والمشارب، والمناكح فيظهر بذلك كمال انقيادهم وطاعتهم لخالقهم، رجاء غفران الذنوب، ونيل الدرجات.
فالصوم عبادة من أفضل العبادات، وأجل القربات، كيف لا؟ وقد قال -صلى الله عليه وسلم- فيما يرويه عن ربه: (كل عمل ابن آدم له إلا الصيام، فإنه لي وأنا أجزي به) متفق عليه.  
  قال السندي -رحمه الله-: "اختصاصه[أي الصوم] من بين سائر الأعمال؛ بأنه مخصوص بعظيم لا نهاية لعظمته، ولا حد لها، وأنّ ذلك العظيم هو المتولي لجزائه مما ينساق الذهن منه إلى أنّ جزاءه مما لا حد له...، قال تعالى: {إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُمْ بِغَيْرِ حِسَابٍ} [الزمر: 10]" انتهى. [حاشية السندي على سنن النسائي (4/ 159)].
 وقد ذكر العلماء -رحمهم الله تعالى- للصوم فوائد كثيرة، ليس هذا محلاً لسردها، فتُراجع في مظانها، وما يهمنا في هذا المقام بيان ما نحن بصدده من جمع فتاوى الصيام لعلمائنا المعاصرين، في جزءٍ مفردٍ، حتى يسهل على طالب العلم وغيره من شرائح المجتمع الوصول إلى مراده بيسر وسهولة.
وأما الزكاة فهي الركن الرابع من أركان الإسلام، وعبادة من عباداته؛ ولأهميتها قُرنت بالصلاة في مواضع كثيرة من القرآن، منها:
قوله تعالى: {وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ وَذَلِكَ دِينُ الْقَيِّمَةِ} [البينة: 5].
ومن السنة: ما رواه البخاري ومسلم عن ابن عمر -رضي الله عنهما- أنّ رسول الله -صلى الله عليه وسلم- قال: (أمرتُ أن أقاتل الناس حتى يشهدوا أن لا إله إلا الله، وأنّ محمداً رسول الله، ويقيموا الصلاة، ويؤتوا الزكاة، فإذا فعلوا ذلك عصموا مني دماءهم وأموالهم إلا بحق الإسلام، وحسابهم على الله) متفق عليه.
ولما كانت عبادة الزكاة ذا أهمية في الإسلام، كان من المهم معرفة أحكامها، والوقوف عليها، حتى يتعبّد المسلم ربه على علم وبصيرة، وتبرأ ذمته بيقين، ولا يتم ذلك إلا بالرجوع إلى كُتب العلماء، من أهل البصر والبصيرة، أو سؤالهم.
ولا يخفى أنّ فتاوى علمائنا المعاصرين غنية بالمسائل المهمة التي يحتاجها كل مسلم، بأسلوب سهل يتناسب مع كثير من شرائح المجتمع، وقد رأينا أنه من الأفضل جمع الفتاوى المتناثرة في جزءٍ مفردٍ يُستغنى به عن غيره من المراجع، على أن يتم تطبيقها أولاً على الهاتف المحمول؛ لما لهذه التقنية من انتشارٍ واسعٍ في أرجاء المعمورة، فقد أصبح الهاتف المحمول في جيب كل مسلم، صغيرٍ وكبيرٍ، ذكرٍ وأنثى، عالمٍ وغير عالم، متعلمٍ وغير متعلم.
فكان من المهم جمع ما يهم المسلم من مسائل الزكاة والصوم وتطبيقها على الهاتف المحمول؛ ليعم نفعها من غير كلفة، وبهذا يتحقق نشر العلم بطريقة بديعة سهلة الوصول. 
وقد استقصينا في هذا الجمع غالب المسائل المهمة، وتم وضع عناوين لها؛ لتقريب حكم المسألة.
وقد تم تخصيص التطبيق بفتاوى علمائنا المعاصرين: 
1ـ مجموع الفتاوى للشيخ ابن باز -رحمه الله-.   
2ـ مجموع الفتاوى للشيخ ابن عثيمين -رحمه الله-.
3ـ نور على الدرب لسماحة الشيخ ابن باز -رحمه الله-.
4ـ فتاوى الشيخ ابن عثيمين -رحمه الله- من نور على الدرب.
5ـ فتاوى الشيخ ابن عثيمين -رحمه الله- من لقاءات الباب المفتوح.  
6ـ فتاوى علماء اللجنة الدائمة (المجموعة الأولى والثانية).
وأما عن عملنا في هذا الجمع فكالآتي:
1ـ وضع عناوين رئيسية موافقة لمضمون المسألة، من غير التزام بما كانت عليه في مصادرها.
2ـ ترتيب الفتاوى في أبواب مستقلة؛ ليسهل الرجوع إليها عند الحاجة. 
3ـ تكرار المسألة الواحدة في عدة أبواب؛ لوجود المناسبة.
4ـ عزو كل فتوى إلى مصدرها، مع توثيقها برقم المجلد والصفحة في الغالب.  
5ـ ننقل السؤال والجواب كما هو، ونادراً ما نقوم باختصارهما.   
6ـ نقوم بتخريج الآيات، ونجعلها بين قوسين.
ونسأل الله تعالى بمنِّه وكرمه أن يجعل هذا العمل خالصاً لوجهه الكريم، وأن ينفعنا به يوم لا ينفع مال ولا بنون، وأن يعفو عنَّا وعن والدينا والمسلمين أجمعين، وأن يوفق كل من كان سبباً في إخراج ونشر هذا التطبيق.    
وآخر دعوانا أن الحمد لله رب العالمين.

إخوانكم في موسوعة الفتاوى `}</Text>
          </ScrollView>
        </Layout>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor:'#3A67BF',
    color:'#fff',
    fontFamily:'DroidKufi',
    flexDirection:'row',
    },
});
