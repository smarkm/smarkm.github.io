

### 为你的idea众筹

有时候一个好的想法需要大量的资金和集体的努力。你可能会需要捐赠， 但是捐赠者更倾向于给予项目他们更确定的是获得动力和适当的资金。这是一个众筹很理想的例子: 你设置一个目标和h截止日期。如果你没有实现这个目标，捐赠会返还，以此来减少捐赠者的风险。 因为代码是公开可审计的，没有必要集中控制， 值得信赖的平台因此，每个人都要支付的唯一费用就是gas。

#### Tokens and DAOs

在这个例子中，我们将通过解决两个重要问题来进行更好的众筹: 如何管理和保持回报, 以及这些钱是如何在筹集到资金之后被花掉的。
众筹的回报通常由一个无法改变的数据库来处理，它可以跟踪所有的捐赠者:  任何错过了竞选活动最后期限的人都无法进入，任何改变主意的捐赠者都无法离开。 相反，我们要做的是去中心化的方法然后创建一个 [token](./token) 来跟踪回报, 任何有贡献的人都会得到一个token，他们可以交易、出售或保存。当给予物质奖励的时候生产者只需要交换真产品的代币。 捐赠者可以保留他们的标记，即使这个项目没有达到他们的目的，作为纪念品。

此外，一般来说，那些资助的人在资金筹集和管理不善的情况下无法对资金的使用情况有任何发言权，往往导致项目根本无法提供任何东西。 在这个项目中，我们将使用一个民主组织[Democratic Organization](./dao)，它将必须批准从系统中获得的任何资金。 这通常被称为众筹或群体权益这是非常基本的，在某些情况下，令牌可以是奖励本身,This is often called a **crowdsale** or **crowd equity** and is so fundamental that in some cases the token can be the reward itself, 特别是在一些项目中，一群人聚在一起，共同建设公共公益事业。

![Get the necessary contracts](https://ethereum.org/images/tutorial/token-crowdsale.png)


* 果您只是测试，将钱包切换到testnet并开始挖掘。

* 首先, 创建一个 [fixed supply token](./token#the-code).对于这个例子，我们要创建一个 **100**， 使用名字 **gadgets**, the box emoji (📦) as a symbol and **0** decimal places. 部署并保持地址。

* 现在创建一个 [shareholder association](./dao#the-shareholder-association). In this example we are going to use the address of the token we just created as the **Shares Address**, a minimum quorum of **10**, and **1500** minutes (25 hours) as the voting time. Deploy this contract and save the address.


#### The code

现在复制这段代码，然后创建众筹:

```
!!!include(solidity/crowdsale.sol)!!!
```

#### Code highlights

注意，**Crowdsale**功能(the one that is called upon contract creation)中是如何设置 **deadline** and **fundingGoal** 的。

    fundingGoal = fundingGoalInEthers * 1 ether;
    deadline = now + durationInMinutes * 1 minutes;
    price = etherCostOfEachToken * 1 ether;

有一些 [special keywords](https://solidity.readthedocs.io/en/latest/units-and-global-variables.html) 在solidity中帮助你编码，in solidity that help you code, 允许你评估一些l类似 **1 ether == 1000 finney** 或者 **2 days == 48 hours**. 在系统内部，所有的ether含量都被定义为 **wei**,最小可分的单位，最小可分的单位。 The code above converts the funding goal into wei by multiplying it by 1,000,000,000,000,000,000 (which is what the special keyword **ether** converts into). The next line creates a timestamp that is exactly X minutes away from today by also using a combination of the special keywords **now** and **minutes**. For more global keywords, check the [solidity documentation on Globally available variables](https://solidity.readthedocs.io/en/latest/units-and-global-variables.html).

The following line will instantiate a contract at a given address:

    tokenReward = token(addressOfTokenUsedAsReward);

Notice that the contract understands what a *token* is because we defined it earlier by starting the code with:

    interface token { function transfer(address receiver, uint amount){  } }

This doesn't fully describe how the contract works or all the functions it has, but describes only the ones this contract needs: a token is a contract with a *transfer* function, and we have one at this address.


#### How to use

点击 **contracts** 然后 **deploy contract**:

![Crowdsale deployment](https://ethereum.org/images/tutorial/crowdsale-deploy.png)

* 设置你刚刚创建的组织的地址 **if successful, send to**.

* 设置 **250** ethers 为融资目标

* 如果你只是为了进行测试或演示,将众筹的持续时间设置为3-10分钟， 但是如果你真的在筹集资金你可以投入更大的资金, 列如 **45,000** (31 days).

* The **ether cost of each token** 应该根据你准备出售多少代币来计算. (在前面的步骤中，您添加的令牌的“初始供应”数量的最大值).在本例中，放入5个 ether.

* 您创建的令牌的地址应该添加到 **token reward address**

设置一个汽油价格，点击部署，等待你的众筹. 一旦创建了众筹页面，你现在就需要存足够的钱来支付回报。点击众筹的地址，然后进行存款和发送 **50 gadgets** to the crowdsale.

**I have 100 gadgets. Why not sell them all?**

这是非常重要的一点。我们正在构建的众筹将完全由令牌持有人控制。这就造成了一个危险，即控制所有标记的50%+1的人将能够将所有的资金发送给自己。你可以尝试在关联合同上创建特殊的代码来防止这些恶意的收购, 或者你可以把所有的资金都发送到一个简单的地址.简单地说，我们只是简单地卖掉了一半的小工具: 如果您想进一步分散它，则将剩下的一半分配给受信任的组织。

#### 筹集资金

一旦众筹完成了所有必要的token,对它的贡献很简单，你可以从任何以太钱包里完成:只要把钱寄给它就行了。您可以在这里看到相关的代码:

    function () {
        require(!crowdsaleClosed);
        uint amount = msg.value;
        // ...

The [unnamed function](https://solidity.readthedocs.io/en/latest/contracts.html#fallback-function) is the default function executed whenever a contract receives ether. 这个功能会自动检查众筹活动是否活跃， 计算调用者购买了多少个令牌，并发送相应的令牌。 如果众包已经结束或者合同没有签订合同，合同就会终止 **throw** meaning the execution will be stopped and 发送的以太将被返回 (但是所有的气体都会被花掉).

![Crowdsale error](https://ethereum.org/images/tutorial/crowdsale-error.png)

这样做的好处是合同可以防止陷入这样一种情况即有人会离开他们的以太或代币. 在之前的版本中，我们也会[**self destruct**](https://solidity.readthedocs.io/en/latest/units-and-global-variables.html#contract-related) 众筹结束后的合同: 这意味着在那一刻之后的任何交易都将失去他们的资金. 通过创建一个回退功能,把销售结束后,我们防止任何人失去钱。

The contract has a safeWithdrawl() function,没有任何参数,可以执行由受益人的访问或资助者回到他们的基金募捐失败的情况。

![Crowdsale execution](https://ethereum.org/images/tutorial/crowdsale-execute.png)

### Extending the crowdsale

#### 如果众筹超过了目标，那该怎么办?

在我们的代码中，只有两件事可以发生:众筹达到目标，或者没有实现。 由于令牌数量有限，这意味着一旦达到目标，就没有其他人能够做出贡献。 不过，众筹的历史上充斥着超出预期的项目，比预期的时间要短得多，或者比预期的要多出很多倍。

#### Unlimited crowdsale

所以我们要稍微修改一下我们的项目而不是发送一组有限的令牌
, 实际上，每当有人给他们发送以太的时候，这个项目就会凭空创造出一个新的令牌。首先，我们需要创建一个 [Mintable token](./token#central-mint).

然后修改众包以重命名所有提到的 **transfer** to **mintToken**:



    contract token { function mintToken(address receiver, uint amount){  } }
    // ...
        function () {
            // ...
            tokenReward.mintToken(msg.sender, amount / price);
            // ...
        }

一旦你发布了众包销售合同，你就可以获得它的地址并进入你的公司。 **Token Contract** to execute a **Change Ownership** function. This will allow your crowdsale to call the **Mint Token** function as much as it wants.

**Warning:**  This opens you to the danger of hostile takeover. At any point during the crowdsale anyone who donates more than the amount already raised will be able to control the whole pie and steal it. There are many strategies to prevent that, but implementing will be left as an exercise to the reader:

* Modify the crowdsale such that when a token is bought, also send the same quantity of tokens to the founder's account so that they always control 50% of the project
* Modify the Organization to create a veto power to some trusted third party that could stop any hostile proposal
* Modify the token to allow a central trusted party to freeze token accounts, so as to require a verification that there isn't any single entity controlling a majority of them

